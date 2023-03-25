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
 *         isImportant:
 *           type: boolean
 *           description: Is todo marked as important
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the todo was added
 *
 *       example:
 *         id: 1675633464112
 *         isChecked: false
 *         isImportant: true
 *         text: Go shopping
 *         createdAt: '2023-02-05T21:44:24.112Z'
 */

const _has = require('lodash/has')
const _isArray = require('lodash/isArray')
const _isBoolean = require('lodash/isBoolean')
const _isString = require('lodash/isString')

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

  if (!text) {
    res.status(400).send({ error: 'Text is required' })

    return
  }

  const newItem = { createdAt: Date.now(), id: Date.now(), isChecked, isImportant: false, text }

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

  if (!_isArray(itemIds)) return
  if (itemIds.length === 0) return

  if (itemIds.length !== todoListItems.length) {
    res.status(400).send({ error: 'Item count mismatch' })

    return
  }

  const reorderedTodoList = itemIds.map((id) => todoListItems.find((item) => item.id === id))

  todoListItems = reorderedTodoList

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

    return
  }

  const updatedItem = req.body

  const currentItem = todoListItems[itemIndex]

  const requiredFields = ['text', 'isChecked', 'isImportant']

  if (requiredFields.some((field) => !_has(updatedItem, field))) {
    res.status(400).send({ error: 'Fields mismatch' })

    return
  }

  const areItemFieldsValid = ({ text, isChecked, isImportant }) => {
    return _isString(text) && _isBoolean(isChecked) && _isBoolean(isImportant)
  }

  if (!areItemFieldsValid(updatedItem)) {
    res.status(400).send({ error: 'Types mismatch' })

    return
  }

  todoListItems[itemIndex] = {
    createdAt: currentItem.createdAt,
    id: currentItem.id,
    isChecked: updatedItem.isChecked,
    isImportant: updatedItem.isImportant,
    text: updatedItem.text,
  }

  res.send(todoListItems[itemIndex])
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
