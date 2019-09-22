const express = require('express')
const userRouter = require('./user')

const generateRoutes = () => {
  const router = express.Router()

  router.get('/status', (req, res) => {
    res.json({ status: 'ok' })
  })

  router.use('/user', userRouter())

  return router
}

module.exports = { generateRoutes }