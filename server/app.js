const express = require('express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/todos', require('./routes/todos'))

const port = process.env.PORT || 3131

const options = {
  apis: ['./routes/*.js'],
  definition: {
    servers: [{ url: `http://localhost:${port}` }],
    openapi: '3.0.3',
    info: {
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Aleksandr',
        url: 'https://alexdus.com',
        email: 'sd@alexdus.com',
      },
      description: 'Leaning app',
      title: 'React Todo App',
      version: '0.1.0',
    },
  },
}

const specs = swaggerJSDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`ReactToDo app listening at http://localhost:${port}`)
  })
}

module.exports = app
