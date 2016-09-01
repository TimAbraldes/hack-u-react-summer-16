/*eslint-disable no-var*/
var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    browsers: [ 'Chrome', 'PhantomJS' ],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    singleRun: !!process.env.WATCH,

    frameworks: [ 'mocha' ],

    files: [
      'tests.webpack.js',
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    webpack: {
      devtool: 'cheap-module-eval-source-map',
      module: {
        loaders: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: { limit: 10240 } },
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.scss$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
          { test: /\.css$/, loader: 'style!css?importLoaders=2&sourceMap&!autoprefixer?browsers=last 2 version' },


        ]
      },
      resolve: {
        modulesDirectories: [
          'src',
          'node_modules'
        ],
        extensions: ['', '.json', '.js']
      },
      plugins: [
        new webpack.NoErrorsPlugin(),
      ]
    },

    webpackServer: {
      noInfo: true
    }
  });
};
