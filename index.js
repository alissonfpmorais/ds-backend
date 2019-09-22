const { config } = require('./config/app')
const { httpClient } = require('./config/express')

const app = httpClient()

app.listen(config.port, () => {
  console.log(`Environment: ${config.env}`)
  console.log(`Listening on port: ${config.port}`)
})
