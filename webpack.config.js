const path = require('path');

module.exports = {
  entry: {
    background: '/background/background.js',
    content: './content_scripts/extractMove.js',
  },
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: '[name].js',
  },
  mode: 'production',
};
