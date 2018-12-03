import { join as joinPath } from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';

const openpgpDep = (name) => {
    return joinPath(__dirname, `node_modules/frontend-commons/node_modules/pmcrypto/node_modules/openpgp/dist/${name}`);
};

export default (config, env, helpers) => {
    config.node.process = 'mock';
    config.node.Buffer = true;

    // Add openpgp
    config.plugins.push(
        new CopyWebpackPlugin([
            {
                from: openpgpDep('openpgp.min.js')
            },
            {
                from: openpgpDep('openpgp.worker.min.js')
            }
        ])
    );

    const loaders = config.module.rules;
    const babelLoader = loaders.find((loader) => loader.loader === 'babel-loader');
    babelLoader.exclude = /node_modules\/(?!frontend-commons)/;
};
