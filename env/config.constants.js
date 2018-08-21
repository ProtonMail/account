const ENV = (() => {
    try {
        return require('./env.json');
    } catch (e) {
        return {};
    }
})();

const AUTOPREFIXER_CONFIG = {
    browsers: ['last 2 versions', 'iOS >= 8', 'Safari >= 8']
};

const STATS_ID = {
    a: {
        siteId: 5, // the id of the global (total) piwik site
        abSiteId: 8 // the id of the piwik site that is configured to only track requests that touch this FE version
    },
    b: {
        siteId: 5, // the id of the global (total) piwik site
        abSiteId: 9 // the id of the piwik site that is configured to only track requests that touch this FE version
    }
};

const API_TARGETS = {
    prod: 'https://protonmail.blue/api',
    local: 'https://protonmail.dev/api',
    localhost: 'https://localhost/api',
    host: 'https://mail.protonmail.host/api',
    vagrant: 'https://172.28.128.3/api',
    build: '/api'
};

Object.keys(ENV).forEach((key) => {
    if (ENV[key].api) {
        API_TARGETS[key] = ENV[key].api;
    }
});

const SENTRY_CONFIG = Object.keys(ENV)
    .reduce((acc, env) => (acc[env] = ENV[env].sentry, acc), {});

const PROD_STAT_MACHINE = {
    isEnabled: false,
    statsHost: 'stats.protonmail.ch',
    domains: ['*.protonmail.com', '*.mail.protonmail.com'],
    cookieDomain: '*.protonmail.com'
};

const HOST_STAT_MACHINE = {
    isEnabled: false,
    statsHost: 'stats.protonmail.host',
    domains: ['*.protonmail.host', '*.mail.protonmail.host'],
    cookieDomain: '*.protonmail.host'
};

const NO_STAT_MACHINE = { isEnabled: false };

const STATS_CONFIG = {
    beta: PROD_STAT_MACHINE,
    prod: PROD_STAT_MACHINE,
    dev: PROD_STAT_MACHINE,
    host: HOST_STAT_MACHINE
};

const TOR_URL = 'https://protonirockerxow.onion/';

module.exports = {
    TOR_URL,
    AUTOPREFIXER_CONFIG,
    STATS_ID,
    API_TARGETS,
    PROD_STAT_MACHINE,
    HOST_STAT_MACHINE,
    NO_STAT_MACHINE,
    STATS_CONFIG,
    SENTRY_CONFIG
};
