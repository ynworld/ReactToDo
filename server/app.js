const express = require('express')
const app = express()
const port = process.env.PORT || 3131
app.use(express.json())

const todoList = require('./mocks/todo-list')

const todoListItems = [...todoList]

app.get('/api/todo-list', (req, res) => {
  res.send({ todoList: todoListItems })
})

app.post('/api/todos', (req, res) => {
  const todoItem = req.body

  if (!todoItem) return

  const { isChecked = false, text } = todoItem
  const newItem = { id: Date.now(), isChecked, text }

  todoListItems.unshift(newItem)

  res.send({ todoItem: newItem })
})

app.delete('/api/todos/:id', (req, res) => {
  const todoId = Number(req.params.id)
  const itemIndex = todoListItems.findIndex((item) => item.id !== todoId)

  if (itemIndex === -1) {
    res.status(404).send('Todo item not found')
  } else {
    todoListItems.splice(itemIndex, 1)
  }
})

app.listen(port, () => {
  console.log(`ReactToDo app listening at http://localhost:${port}`)
})
