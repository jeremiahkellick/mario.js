const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env']
          }
        },
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash]-[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
