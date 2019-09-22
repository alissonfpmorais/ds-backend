const { config } = require('./app')
const jwt = require('express-jwt')

module.exports = {
  userAuth: jwt({ secret: config.jwtSecret})
}
