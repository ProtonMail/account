#!/usr/bin/env node

const os = require('os');
const Listr = require('listr');
const execa = require('execa');
const chalk = require('chalk');
const del = require('del');
const UpdaterRenderer = require('listr-update-renderer');
const moment = require('moment');

const { success, error, warn, json } = require('./helpers/log');

const env = require('../env/config');
const { CONFIG, branch } = env.getConfig('dist');

const push = (branch) => {
    const commands = ['cd dist'];
    if (os.platform() === 'linux') {
        commands.push('git ls-files --deleted -z | xargs -r -0 git rm');
    } else {
        commands.push('(git ls-files --deleted -z  || echo:) | xargs -0 git rm');
    }
    commands.push('git add --all');
    commands.push('git commit -m "New Release"');
    commands.push(`git push origin ${branch}`);
    commands.push('cd ..');
    commands.push(`git push origin ${branch}`);
    return execa.shell(commands.join(' && '), { shell: '/bin/bash' });
};

const pullDist = (branch) => {
    const commands = [
        `git fetch origin ${branch}:${branch}`,
        `git clone file://$PWD --depth 1 --single-branch --branch ${branch} dist`,
        'cd dist',
        'rm -rf *'
    ].join(' && ');
    return execa.shell(commands, { shell: '/bin/bash' });
};

const checkEnv = async () => {
    try {
        await execa.shell('[ -e ./env/env.json ]', { shell: '/bin/bash' });
    } catch (e) {
        throw new Error('You must have env.json to deploy. Cf the wiki');
    }
};

const getTasks = (branch, { isCI, flowType = 'single' }) => [
    {
        title: 'Clear previous dist',
        task: async () => {
            await del(['dist'], { dryRun: false });
            isCI && execa.shell('mkdir dist');
        }
    },
    {
        title: 'Setup config',
        enabled: () => !isCI,
        task() {
            return execa('tasks/setupConfig.js', process.argv.slice(2));
        }
    },
    {
        title: `Pull dist branch ${branch}`,
        enabled: () => !isCI,
        task: () => pullDist(branch)
    },
    {
        title: 'Build the application',
        task() {
            const args = process.argv.slice(2);
            return execa('npm', ['run', 'build', ...args, '--', '--no-clean', '--dest', 'dist']);
        }
    },
    {
        title: 'Move static files to root',
        task() {
            return execa.shell('cp src/app-id.json dist/app-id.json', { shell: '/bin/bash' });
        }
    },
    {
        title: `Push dist to ${branch}`,
        enabled: () => !isCI,
        task: () => push(branch)
    }
];


// Custom local deploy for the CI
const isCI = process.env.NODE_ENV_DIST === 'ci';

if (!branch && !isCI) {
    throw new Error('You must define a branch name. --branch=XXX');
}

process.env.NODE_ENV_BRANCH = branch;
process.env.NODE_ENV_API = CONFIG.apiUrl;

!isCI && console.log(`➙ Branch: ${chalk.bgYellow(chalk.black(branch))}`);
console.log(`➙ API: ${chalk.bgYellow(chalk.black(CONFIG.apiUrl))}`);
console.log(`➙ SENTRY: ${chalk.bgYellow(chalk.black(process.env.NODE_ENV_SENTRY))}`);
console.log('');

env.argv.debug && json(CONFIG);

const start = moment(Date.now());
const tasks = new Listr(getTasks(branch, { isCI }), {
    renderer: UpdaterRenderer,
    collapse: false
});

tasks
    .run()
    .then(() => {
        const now = moment(Date.now());
        const total = now.diff(start, 'seconds');
        const time = total > 60 ? moment.utc(total * 1000).format('mm:ss') : `${total}s`;

        !isCI && success('App deployment done', { time });
        isCI && success(`Build CI app to the directory: ${chalk.bold('dist')}`, { time });
    })
    .catch(error);
