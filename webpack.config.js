
const path = require('path');

module.exports = {
  entry: {
    index : './app/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  }, 
  devtool: 'eval-source-map',
};