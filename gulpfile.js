var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var connect = require('gulp-connect');

gulp.task('default', function (callback) {
  var compiler = webpack(require('./webpack.config.js'));
  new WebpackDevServer(compiler, {
    proxy: {
      '/ajax/*': {
        target: 'http://localhost:8000',
        secure: false,
        rewrite: function (req) {
          req.url = req.url.replace(/^\/ajax/, '');
        }
      }
    },
    hot: true,
    historyApiFallback: false,
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
  });
});

gulp.task('build', function (callback) {
  // var env = process.argv[3] ? process.argv[3].substr(2) : 'dev';
  var webpackConfig = require('./webpack.config.js');
  webpack(require('./webpack.config.js'), (err, state) => {
    if (err)   {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', state.toString());
  });
});

