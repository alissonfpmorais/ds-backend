const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { generateRoutes } = require('../app/views')

const httpClient = () => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/api/v1', generateRoutes())

  return app
}

module.exports = { httpClient }