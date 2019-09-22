const jwt = require('jsonwebtoken')
const { config } = require('../../config/app')
const { user } = require('../models')

const userSecurity = (model) => {
  return (req, res, next) => {
    model
      .findOne({
        where: { email: req.body.email }
      })
      .then(user => {
        req.maybeUser = user
        req.secret = config.jwtSecret
        req.duration = config.jwtDuration

        return next()
      })
      .catch(e => next(e))
  }
}

const authenticate = (req, res, next) => {
  const user = req.maybeUser

  if (!user) return next()

  user
    .isValidPassword(req.body.password)
    .then(isValid => {
      if (isValid) req.user = user

      return next()
    })
    .catch(e => next(e))
}

const generateToken = (req, res, next) => {
  if (!req.user) return next()

  const jwtPayload = { id: req.user.id }
  const jwtData = { expiresIn: req.duration }
  const jwtSecret = req.secret

  req.token = jwt.sign(jwtPayload, jwtSecret, jwtData)

  return next()
}

const requestJWT = (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' })
  } else {
    const user = req.user.toJSON()

    delete user.password
    user.token = req.token

    res.status(200).json(user)
  }
}

module.exports = { userSecurity, authenticate, generateToken, requestJWT }
