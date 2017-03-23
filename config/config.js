var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'vault-dragon'
    },
    port: 3000,
    db: 'mongodb://localhost/vault-dragon-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'vault-dragon'
    },
    port: 3000,
    db: 'mongodb://localhost/vault-dragon-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'vault-dragon'
    },
    port: 3000,
    db: 'mongodb://localhost/vault-dragon-production'
  }
};

module.exports = config[env];
