const { loadController } = require('./base')
const { user } = require('../models')

module.exports = loadController(user, (body) => ({
  name: body.name,
  email: body.email,
  password: body.password,
  birth: body.birth,
  job: body.job,
  photo: body.photo
}))