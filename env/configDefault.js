const PACKAGE = require('../package');

module.exports = {
    app_version: '3.15.4' || PACKAGE.version,
    api_version: '3',
    date_version: new Date().toDateString(),
    year: new Date().getFullYear(),
    clientID: 'WebVPN',
    articleLink: 'https://protonmail.com/blog/protonmail-v3-14-release-notes/',
    changelogPath: '',
    url: 'https://account.protonmail.red',
    loadI18n: false,
    translations: []
};
