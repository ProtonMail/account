const preactCliLodash = require('preact-cli-lodash');

module.exports = function (config, env, helpers) {
  config.node.process = 'mock';
  config.node.Buffer = true;
  // console.log(config);

  preactCliLodash(config);

  const loaders = config.module.loaders;
  const babelLoader = loaders.find(loader => loader.loader === 'babel-loader');
  babelLoader.exclude = /node_modules/;

  const { index } = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0];
  config.plugins.splice(index, 1)
};
