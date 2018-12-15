module.exports = (function () {
  return {
    local: { // localhost
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '18DBpro+',
      database: 'CARCENTER'
    },
    real: { // real server db info
      host: '',
      port: '',
      user: '',
      password: '!',
      database: ''
    },
    dev: { // dev server db info
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  }
})();
