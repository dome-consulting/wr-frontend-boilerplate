'use strict';

/* Dependencies */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Build Paths */
const SRCDIR = path.resolve(__dirname, 'src');
const CNFDIR = path.resolve(__dirname, 'conf');
const OUTDIR = path.resolve(__dirname, 'dist');

/* Custom fancy log */
const log = (title, text) => {
  console.info(`${colors.reset.white(title)}: ${colors.bold.blue(text)}`)
};

module.exports = (env = {}) => {

  const buildMinified = !!env.minify;

  /* Log configuration */
  log('App configuration for', env.conf);
  log('Build minified', !!buildMinified);
  log('Devserver enabled', !!env.devserver);

  /* Environment dependent configuration constants used in app code */  
  const appConfig = Object.assign(
    require(path.resolve(CNFDIR, 'common')),
    require(path.resolve(CNFDIR, env.conf))    
  );

  /* Webpack configuration */
  let webpackConfig = {
    /* Main entry point */
    entry: path.resolve(SRCDIR, 'index.js'),

    /* JavaScript bundle output */
    output: {
      path: OUTDIR,
      publicPath : '/',
      filename: 'js/bundle.js'
    },

    devtool : buildMinified ? 'source-map' : 'eval',

    /* Additional modules */
    module: {
      loaders: [
        /* Loader for js and jsx files */
        {
          include: SRCDIR,
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        /* Loader for sass files */
        {
          include: SRCDIR,
          test : /\.s(a|c)ss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: `css-loader?${buildMinified ? 'minimize' : ''}!sass-loader`
          })
        },
        /* Required by react-flexbox-grid https://github.com/roylee0704/react-flexbox-grid */
        {
          include: /flexboxgrid/,
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        }
      ]
    },

    /* Plugins: https://github.com/webpack/docs/wiki/list-of-plugins */
    plugins: [
      /* Inject configuration constants */
      new webpack.DefinePlugin({ 'APP_CONFIG' : appConfig }),

      /* Extract custom css bundle */
      new ExtractTextPlugin('css/bundle.css'),

      /* Build index.html and inject bundles */
      new HtmlWebpackPlugin({
        template: path.resolve(SRCDIR, 'index.html'),
        hash: true,
        inject: true
      }),

      /* Minimize code, but avoid mangle */
      new webpack.optimize.UglifyJsPlugin({
          minimize : buildMinified,
          comments : !buildMinified,
          mangle : false
      }),

      /* Set NODE_ENV only for production */
      new webpack.DefinePlugin(buildMinified 
        ? {
            "process.env": { 
              NODE_ENV: 'production'
            }
          } 
        : {}
      )
    ],

    /* Local development server configuration */
    devServer: {
      contentBase: OUTDIR,
      publicPath: '/',
      hot: true,
      inline: true,
      historyApiFallback: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      host: env.host || '0.0.0.0',
      port: env.port || '8000',
      quiet: false
    }
  };

  if (env.devserver) {
      /* Additional webpack configuration to enable hot replacement in webpack dev server */
      webpackConfig.plugins.push(
        /* Ignore watch node_modules */
        new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
        /* Enable hot deploy */
        new webpack.HotModuleReplacementPlugin()
      );
  }

  return webpackConfig;
};
