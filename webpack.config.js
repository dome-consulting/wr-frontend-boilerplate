'use strict';

/* Dependencies */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const errorProp = (label, value, mvn = false) => {
  if (mvn)
    return label + ": " + value;
  
  return colors.inverse(label) + ": " + value;
}

const logProp = (label, value, mvn = false) => {  
  if (mvn)
    console.info(label, ': ', value);
  
  return colors.white(colors.bold(label)) + ": " + colors.bold(colors.blue(value));
}

/* Build Paths */
const SRCDIR = path.resolve(__dirname, 'src');
const CNFDIR = path.resolve(__dirname, 'conf');
const OUTDIR = path.resolve(__dirname, 'dist');

/* Custom fancy log */
const log = (title, text) => {
  console.info(logProp(title, text));
  //console.log(`${colors.reset.white(title)}: ${colors.bold.blue(text)}`)
};

module.exports = (env = {}, mvn = false) => {
  if (!env.conf) {
    throw errorProp(" !! MISSING_ENVIRONMENT !! ", "No se ha especificado el valor para env.conf !! ");
  }
  
  log("Webpack configuration for", env.p, mvn);
  log("Devserver enabled", !!env.devserver, mvn);
  console.info();

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
      rules: [
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
      })
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

  if (env.conf === 'pro') {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }), 
      /* Minimize code, but avoid mangle */
      new webpack.optimize.UglifyJsPlugin({
        minimize : buildMinified,
        comments : !buildMinified,
        mangle: false
      })
    );
  } else {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
    );
  }

  return webpackConfig;
};
