const path = require('path');
// const webConfig = require('./webConfig');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const getEnvironmentConstants = require('./Utils/getEnvironmentConstants');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV && process.env.NODE_ENV === "development";

module.exports = {

  // production || development
  mode: isDev ? 'development': 'production',
  // Tell webpack the root file of our
  // server application 
    

  entry: [
    './src/client.js', 
    './src/assets/scss/styles.scss'
  ],

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/build/public/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //3. inject
            options: {
              hmr: isDev,
              reloadAll: isDev
            }
          },
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

          // npm package names are URL-safe, but some servers don't like @ symbols
          return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'assets/css/[name].[contenthash:8].min.css',
      chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/graphics', to: 'assets/graphics' },
      { from: 'src/assets/email_templates', to: 'assets/email_templates' }
    ]),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CleanWebpackPlugin(),
    new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/'
      }        
    ),
    new webpack.DefinePlugin({ 
      'process.env' : getEnvironmentConstants(),
      'process.env.NODE_ENV' : isDev ? JSON.stringify('development'): JSON.stringify('production') 
    })
  ]
};


