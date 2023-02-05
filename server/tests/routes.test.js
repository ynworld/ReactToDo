const supertest = require('supertest')
const app = require('../app')
const _isNumber = require('lodash/isNumber')

const request = supertest(app)

test('should load todo list', async () => {
  const res = await request.get('/api/todo-list')

  expect(res.statusCode).toBe(200)
  expect(res.body).toHaveProperty('todoList')
})

test('should create todo item', async () => {
  const testTodoText = 'Test todo'
  const { body, statusCode } = await request.post('/api/todos').send({ text: testTodoText })

  expect(statusCode).toBe(200)
  expect(body.todoItem.text).toBe(testTodoText)
  expect(_isNumber(body.todoItem.id)).toBe(true)
})

test('should delete todo item', async () => {
  const { body: { todoItem } } = await request.post('/api/todos').send({ text: 'Test todo' })

  const { body, statusCode } = await request.delete(`/api/todos/${todoItem.id}`)

  expect(statusCode).toBe(200)
  expect(body.todoItem.id).toBe(todoItem.id)
})

test('should update todo item', async () => {
  const { body: { todoItem } } = await request.post('/api/todos').send({ text: 'Test todo' })
  await request.get('/api/todo-list')

  const editedTodoText = 'Edited todo'

  const { body, statusCode } = await request.put(`/api/todos/${todoItem.id}`).send({ text: editedTodoText })

  expect(statusCode).toBe(200)
  expect(body.todoItem.text).toBe(editedTodoText)
})
