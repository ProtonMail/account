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

/**
 * Create sub bundles of the app as the diff won't exist or
 * is only about one key for A/B testing (prod-b)
 * @param  {String} branch
 * @param  {Boolean} options.start Create cache dist dir
 * @param  {Boolean} options.end   Remove cache dist dir
 * @return {Promise}
 */
const buildCustomApp = async (branch, { start, end } = {}) => {
    const { abSiteId } = CONFIG.statsConfig;
    const { abSiteId: abSiteIdB } = env.getStatsConfig(branch);
    const { CONFIG: cfg } = env.getConfig('dist');

    process.env.NODE_ENV_BRANCH = branch;
    process.env.NODE_ENV_API = cfg.apiUrl;

    if (start) {
        // Backup build to prevent conditions as it will always be the same things to replace
        await execa.shell('rsync -av --progress dist/ distback --exclude .git', { shell: '/bin/bash' });
    }

    // Backup build assets
    const cli = ['rsync -av --progress distback/ distCurrent --exclude .git', 'rm -rf dist'];
    await execa.shell(cli.join(' && '), { shell: '/bin/bash' });
    await pullDist(branch, true);

    // Update previous dist with new assets
    const cmd = [`rsync -av --delete distCurrent/ dist --exclude .git`, `rm -rf distCurrent`];

    // A/B testing config
    if (/deploy-prod/.test(branch)) {
        cmd.unshift(
            `sed -i "s/abSiteId:${abSiteId}/abSiteId:${abSiteIdB}/g;" $(find distCurrent/ -type f -name 'app.*.js')`
        );
    }

    end && cmd.push(`rm -rf distback`);

    await execa.shell(cmd.join(' && '), { shell: '/bin/bash' });
    await push(branch);
};

const checkEnv = async () => {
    try {
        await execa.shell('[ -e ./env/env.json ]', { shell: '/bin/bash' });
    } catch (e) {
        throw new Error('You must have env.json to deploy. Cf the wiki');
    }
};

const getTasks = (branch, { isCI, flowType = 'single' }) => {
    const list = [
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
                return execa.shell([
                    ['npm run build', ...args, '-- --no-clean --dest dist'].join(' '),
                    'cp src/app-id.json dist/app-id.json'
                ].join(' && '), { shell: '/bin/bash' });
            }
        },
        {
            title: `Push dist to ${branch}`,
            enabled: () => !isCI,
            task: () => push(branch)
        }
    ];

    if (isCI || flowType !== 'many') {
        return list;
    }

    // Keep prod-b as the latest one as it's the only one with a diff config
    ['dev', 'tor', 'prod-b'].forEach((key, i, arr) => {
        list.push({
            title: `Create sub-bundle for deploy-${key}`,
            enabled: () => !isCI && /prod-a$/.test(branch),
            task() {
                return buildCustomApp(`deploy-${key}`, {
                    start: i === 0,
                    end: i === arr.length - 1
                });
            }
        });
    });
    return list;
};

// Custom local deploy for the CI
const isCI = process.env.NODE_ENV_DIST === 'ci';

if (!branch && !isCI) {
    throw new Error('You must define a branch name. --branch=XXX');
}

if (/cobalt/.test(branch) && !env.argv.qaforce) {
    warn('QA Branch do not update cf wiki server dev');
    console.log('To force update use the flag --qaforce');
    process.exit(0);
}

process.env.NODE_ENV_BRANCH = branch;
process.env.NODE_ENV_API = CONFIG.apiUrl;

!isCI && console.log(`➙ Branch: ${chalk.bgYellow(chalk.black(branch))}`);
console.log(`➙ API: ${chalk.bgYellow(chalk.black(CONFIG.apiUrl))}`);
console.log(`➙ SENTRY: ${chalk.bgYellow(chalk.black(process.env.NODE_ENV_SENTRY))}`);
console.log('');

env.argv.debug && json(CONFIG);

const flowType = env.argv.flow;
const start = moment(Date.now());
const tasks = new Listr(getTasks(branch, { isCI, flowType }), {
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
