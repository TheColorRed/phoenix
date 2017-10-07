const path = require('path')

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
  output: {
    libraryTarget: 'window',
    library: 'GameBoy',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};