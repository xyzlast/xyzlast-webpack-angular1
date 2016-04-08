'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

function buildConfig() {
  let isProd = false;
  process.argv.forEach(arg => {
    if (!isProd) {
      isProd = arg.toLowerCase() === '--production';
    }
  });
  const isTest = false;
  console.log('== build mode ==');
  console.log('isProd: ' + isProd.toString());
  console.log('isTest: ' + isTest.toString());

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   */
  var config = {
    resolve: {
      extensions: [ '', '.js', 'min.js' ],
      modulesDirectories: [
        'node_modules',
        path.join(__dirname, 'libs/kendo/src/js')
      ]
    }
  };

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   */
  config.entry = isTest ? {} : {
    app: './src/app/app.js'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   */
  config.output = isTest ? {} : {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  if (isTest) {
    config.devtool = 'inline-source-map';
  } else if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   */

  // Initialize module
  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\/angular\.js$/,
      loader: 'imports?jQuery=jquery'
    }, {
      test: /\/jquery.js$/,
      loader: 'expose?jQuery'
    }, {
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      },
      exclude: /node_modules/
    }, {
      // CSS LOADER
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      test: /\.html$/,
      loader: 'raw'
    }]
  };

  // Skips node_modules and files that end with .test.js
  if (isTest) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'isparta-instrumenter'
    });
  }

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  // Default Libraries (Promise, jQuery, lodash)
  config.plugins.push(new webpack.ProvidePlugin({
    'window._': 'lodash',
    'window.Promise': 'bluebird',
    'window.$': 'jquery',
    'window.jQuery': 'jquery'
  }));

  // Skip rendering index.html in test mode
  if (isProd) {
    // Clean Old files
    config.plugins.push(
      new CleanWebpackPlugin(['dist', 'build'], {
        verbose: true,
        dry: false
      })
    );
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
    );
    config.plugins.push(
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{ from: __dirname + '/src/public'}])
    );
  }

  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };
  return config;
}

module.exports = buildConfig();
