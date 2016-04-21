import path from 'path';
import webpack from 'webpack';

export default {
  debug: true,
  devtool: 'inline-source-map',

  entry: {
    app: path.resolve(__dirname, 'src/js/main.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'node_modules')
    ]
  },

  module: {
    loaders: [
      { test: /\.js[x]?$/, loader: 'babel', include: path.resolve(__dirname, 'src/js'), exclude: /node_modules/ }
    ]
  }
}
