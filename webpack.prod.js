const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      PIXI: path.join(__dirname, 'node_modules/pixi.js/lib/index.js')
    }
  },
  plugins: [
    new UglifyJSPlugin()
  ],
  output: {
    libraryTarget: 'var',
    library: 'Phoenix',
    filename: 'phoenix.min.js',
    path: path.resolve(__dirname, 'dist')
  }
};