var path = require('path');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
<<<<<<< HEAD
  entry: `${SRC_DIR}/index.jsx`,
=======
  entry: {
    index: `${SRC_DIR}/index.jsx`,
    loggedIn: `${SRC_DIR}/loggedIn.jsx`,
  },
>>>>>>> Update html and jsx files, and webpack
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
       }
      }
    ]
  }
};
