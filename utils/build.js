// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

var webpack = require('webpack'),
  path = require('path'),
  fs = require('fs'),
  config = require('../webpack.config'),
  ZipPlugin = require('zip-webpack-plugin');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename: `chrome-production-latest.zip`,
    path: path.join(__dirname, '../', 'zip'),
  })
);

webpack(config, function (err) {
  if (err) throw err;
});
