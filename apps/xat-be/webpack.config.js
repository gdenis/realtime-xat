const { composePlugins, withNx } = require('@nrwl/webpack');
const nodeExternals = require('webpack-node-externals');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.externalsPresets = { node: true };
  config.externals = [
    nodeExternals(),
    {
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    },
  ];
  return config;
});
