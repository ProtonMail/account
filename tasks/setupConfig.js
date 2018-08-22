#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dedent = require('dedent');

const env = require('../env/config');
const PATH_CONFIG = path.resolve('./src/config.js');
const { CONFIG } = env.getConfig();

fs.writeFileSync(PATH_CONFIG, `export default ${JSON.stringify(CONFIG, null, 4)};`);
/**
 * Fuck you webpack
 * thx https://github.com/webpack/watchpack/issues/25#issuecomment-357483744
 */
const now = Date.now() / 1000;
const then = now - 11;
fs.utimesSync(PATH_CONFIG, then, then);
env.argv.debug && console.log(`${JSON.stringify(CONFIG, null, 2)}`);

if (process.env.NODE_ENV !== 'dist' && process.env.NODE_ENV_MODE !== 'config') {

    if (!env.hasEnv() && !env.isWebClient()) {
        console.log();
        console.log(dedent`
            ${chalk.bgMagenta('⚠ No env.json detected')}
            ➙ Please check the wiki to create it
        `);
        console.log();
    }

    portfinder.getPortPromise().then((port) => {
        process.env.NODE_ENV_PORT = port;
        console.log(dedent`
            ${chalk.green('✓')} Generate configuration
            ➙ Api: ${chalk.bgYellow(chalk.black(CONFIG.apiUrl))}
            ➙ Sentry: ${chalk.yellow(process.env.NODE_ENV_SENTRY)}
        `);
    });
}
