/**
 * @openapi
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of todo
 *         text:
 *           type: string
 *           description: The text of todo
 *         isChecked:
 *           type: boolean
 *           description: Is todo marked as done
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the todo was added
 *
 *       example:
 *         id: 1675633464112
 *         isChecked: false
 *         text: Go shopping
 *         createdAt: '2023-02-05T21:44:24.112Z'
 */

const _omit = require('lodash/omit')

const express = require('express')
const router = express.Router()

const todoList = require('../mocks/todo-list')

let todoListItems = [...todoList]

/**
 * @openapi
 * /todos:
 *   get:
 *     summary: List of all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', (req, res) => {
  res.send({ items: todoListItems })
})

/**
 * @openapi
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The created todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */
router.post('/', (req, res) => {
  const todoItem = req.body

  if (!todoItem) return

  const { isChecked = false, text } = todoItem

  if (!text) return res.status(400).send({ error: 'Text is required' })

  const newItem = { id: Date.now(), isChecked, text, createdAt: new Date() }

  todoListItems.unshift(newItem)

  res.send(newItem)
})

/**
 * @openapi
 * /reorder:
 *   put:
 *     summary: Re-order Todos
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *                id:
 *                  type: number
 *                  description: Todo Id
 *
 *     responses:
 *       200:
 *         description: The list of re-ordered todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */
router.put('/reorder', (req, res) => {
  const { itemIds } = req.body

  if (!itemIds) return

  if (itemIds.length !== todoListItems.length) {
    return res.status(400).send({ error: 'Item count mismatch' })
  }

  let newList = []

  for (let i = 0; i < itemIds.length; i++) {
    const todoItem = todoListItems.find((item) => item.id === itemIds[i])
    newList.push(todoItem)
  }

  todoListItems = newList

  res.send(todoListItems)
})

/**
 * @openapi
 * /todos/{id}:
 *   put:
 *     summary: Update existing todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo item not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', (req, res) => {
  const todoId = Number(req.params.id)
  const itemIndex = todoListItems.findIndex((item) => item.id === todoId)

  if (itemIndex === -1) {
    res.status(404).send({ error: 'Todo item not found' })
  } else {
    todoListItems[itemIndex] = { ...todoListItems[itemIndex], ..._omit(req.body, 'id') }
    res.send(todoListItems[itemIndex])
  }
})

/**
 * @openapi
 * /todos/{id}:
 *   delete:
 *     summary: Remove todo
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The removed todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo item not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', (req, res) => {
  const todoId = Number(req.params.id)
  const itemIndex = todoListItems.findIndex((item) => item.id === todoId)

  if (itemIndex === -1) {
    res.status(404).send({ error: 'Todo item not found' })
  } else {
    const [removedItem] = todoListItems.splice(itemIndex, 1)
    res.status(200).send(removedItem)
  }
})

module.exports = router
