var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '" https://easy-mock.com/mock/59ad3f52e0dc6633419c18f5/dm-admin"'
  BASE_API: '"http://47.95.113.210:8080"',
  API_VERSION:"/api/v1",
  SERVER_API:'"http://47.95.113.210:8080/api/v1"'
});
