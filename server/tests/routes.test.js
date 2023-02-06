const supertest = require('supertest')
const app = require('../app')
const _isNumber = require('lodash/isNumber')

const request = supertest(app)

test('should load todo list', async () => {
  const res = await request.get('/todos')

  expect(res.statusCode).toBe(200)
  expect(res.body).toHaveProperty('items')
})

test('should create todo item', async () => {
  const testTodoText = 'Test todo'
  const { body, statusCode } = await request.post('/todos').send({ text: testTodoText })

  expect(statusCode).toBe(200)
  expect(body.text).toBe(testTodoText)
  expect(_isNumber(body.id)).toBe(true)
})

test('should fail to creat todo without text', async () => {
  const { statusCode } = await request.post('/todos').send({})

  expect(statusCode).toBe(400)
})

test('should delete todo item', async () => {
  const { body: { id } } = await request.post('/todos').send({ text: 'Test todo' })

  const { body, statusCode } = await request.delete(`/todos/${id}`)

  expect(statusCode).toBe(200)
  expect(body.id).toBe(id)
})

test('should update todo item', async () => {
  const { body: { id } } = await request.post('/todos').send({ text: 'Test todo' })
  await request.get('/todos')

  const editedTodoText = 'Edited todo'

  const { body, statusCode } = await request.put(`/todos/${id}`).send({ text: editedTodoText })

  expect(statusCode).toBe(200)
  expect(body.text).toBe(editedTodoText)
})
