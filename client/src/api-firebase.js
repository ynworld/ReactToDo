import _pull from 'lodash/pull'
import { toast } from 'react-toastify'

const firebaseURL = process.env.REACT_APP_FIREBASE_URL

const handleResponse = (response) => {
  const body = response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return body
}

const getFirebaseReorderList = () =>
  fetch(`${firebaseURL}/todos/reorder/itemIds.json`).then(handleResponse)

const processFirebaseData = (data) => {
  const reorderData = data.reorder

  const todosArray = Object.values(data).filter((item) => item.type === 'todo')

  if (!reorderData) {
    return { items: todosArray }
  }

  const { itemIds: orderedIds } = reorderData

  if (orderedIds.length !== todosArray.length) {
    // eslint-disable-next-line
    console.error('Unable to sort: id count mismatch')
    toast.error(`Sorry: We couldn't sort your todos. We are working on a fix!`)

    return { items: todosArray }
  }

  const todosMap = new Map()

  todosArray.forEach((todo) => {
    todosMap.set(todo.id, todo)
  })

  const orderedTodos = orderedIds.map((id) => todosMap.get(id))

  return { items: orderedTodos }
}

const get = (url) =>
  fetch(`${firebaseURL}${url}.json`).then(handleResponse).then(processFirebaseData)

const put = (url, data) =>
  fetch(`${firebaseURL}${url}.json`, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  }).then(handleResponse)

const post = async (url, data) => {
  const todo = {
    createdAt: Date.now(),
    description: data.description,
    id: Date.now(),
    isChecked: false,
    isImportant: false,
    text: data.text,
    type: 'todo',
  }

  put(`${url}/${todo.id}`, todo)

  const todoIds = await getFirebaseReorderList()

  if (todoIds) {
    todoIds.unshift(todo.id)
    put('/todos/reorder/itemIds', todoIds)
  }

  return todo
}

const updateFirebaseReorderList = async (id) => {
  const todoIds = await getFirebaseReorderList()

  if (todoIds) {
    _pull(todoIds, id)
    put('/todos/reorder/itemIds', todoIds)
  }
}

const del = (url, id) =>
  fetch(`${firebaseURL}${url}.json`, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .then(updateFirebaseReorderList(id))

export { del, get, post, put }
