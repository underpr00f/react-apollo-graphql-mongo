const path = require('path');
// const webConfig = require('./webConfig');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
    filename: '[name].js',
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

  node: {
    fs: 'empty'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'assets/css/[name].min.css',
      chunkFilename: 'assets/css/[name].chunk.css'
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
    )

  ]
};


