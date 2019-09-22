const express = require('express')
const auth = require('../../config/auth')
const authController = require('../controllers/auth')
const userController = require('../controllers/user')
const { user } = require('../models')

const userRouter = () => {
  const router = express.Router()

  router.route('/auth')
    .post(
      authController.userSecurity(user),
      authController.authenticate,
      authController.generateToken,
      authController.requestJWT
    )

  router.route('/')
    .get(auth.userAuth, userController.list)
    .post(userController.create)

  router.route('/:id')
    .get(auth.userAuth, userController.get)
    .put(auth.userAuth, userController.update)
    .delete(auth.userAuth, userController.remove)

  router.param('id', userController.load)

  return router
}

module.exports = userRouter