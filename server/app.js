const express = require('express')
const app = express()
const port = process.env.PORT || 3131

const todoListItems = require('./mocks/todo-list')

app.get('/api/todo-list', (req, res) => {
  res.send({ todoList: todoListItems })
})

app.listen(port, () => {
  console.log(`ReactToDo app listening at http://localhost:${port}`)
})
