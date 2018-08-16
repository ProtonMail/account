const PACKAGE = require('../package');


module.exports = {
    app_version: PACKAGE.version,
    api_version: '3',
    date_version: new Date().toDateString(),
    year: new Date().getFullYear(),
    clientID: 'WebVPN',
    clientSecret: 'e601ca139540a6e55a25071c3a5b9557',
    articleLink: 'https://protonmail.com/blog/protonmail-v3-14-release-notes/',
    changelogPath: 'assets/changelog.tpl.html',
};
