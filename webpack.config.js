const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: './app'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: 'https://localhost:9000/dist/'
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    compress: true,
    https: true,
    port: 9000,
    contentBase: './html',
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: 'buble-loader',
        options: {
          jsx: 'React.h',
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
