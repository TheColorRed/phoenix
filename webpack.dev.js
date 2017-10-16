const path = require('path')

module.exports = {
  // entry: './src/index.ts',
  devtool: 'inline-source-map',
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
  output: {
    libraryTarget: 'var',
    library: 'Phoenix',
    filename: 'phoenix.js',
    path: path.resolve(__dirname, 'dist')
  }
};