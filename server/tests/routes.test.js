const supertest = require('supertest')
const _isNumber = require('lodash/isNumber')
const app = require('../app')

const request = supertest(app)

const todoItemMock = {
  description: 'Updated description',
  isChecked: true,
  isImportant: true,
  text: 'Edited todo',
}

test('should load todo list', async () => {
  const res = await request.get('/todos')

  expect(res.statusCode).toBe(200)
  expect(res.body).toHaveProperty('items')
})

test('should create todo item', async () => {
  const { body, statusCode } = await request.post('/todos').send(todoItemMock)

  expect(statusCode).toBe(200)
  expect(body).toMatchObject(todoItemMock)
  expect(_isNumber(body.id)).toBe(true)
})

test('should fail to creat todo without text', async () => {
  const { statusCode } = await request.post('/todos').send({})

  expect(statusCode).toBe(400)
})

test('should delete todo item', async () => {
  const {
    body: { id },
  } = await request.post('/todos').send(todoItemMock)

  const { body, statusCode } = await request.delete(`/todos/${id}`)

  expect(statusCode).toBe(200)
  expect(body.id).toBe(id)
})

test('should update todo item', async () => {
  const {
    body: { id },
  } = await request.post('/todos').send(todoItemMock)

  await request.get('/todos')

  const updatedTodo = {
    description: '21',
    isChecked: false,
    isImportant: false,
    text: '21 21',
  }

  const { body, statusCode } = await request.put(`/todos/${id}`).send(updatedTodo)

  expect(statusCode).toBe(200)
  expect(body).toMatchObject(updatedTodo)
})

test('should reorder todo list', async () => {
  const res = await request.get('/todos')

  const existingIds = res.body.items.map((item) => item.id)

  const itemIds = existingIds

  itemIds.reverse()

  const { body, statusCode } = await request.put('/todos/reorder').send({ itemIds })

  const newIds = body.map((item) => item.id)

  const compareIds = newIds.join() === itemIds.join()

  expect(statusCode).toBe(200)
  expect(compareIds).toBe(true)
})
