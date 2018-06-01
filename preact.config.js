const preactCliLodash = require('preact-cli-lodash');

module.exports = function (config) {
  config.node.process = 'mock';
  config.node.Buffer = true;
  // console.log(config);

  preactCliLodash(config);

  const loaders = config.module.loaders;
  const babelLoader = loaders.find(loader => loader.loader === 'babel-loader');
  babelLoader.exclude = /node_modules/;
};