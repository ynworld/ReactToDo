import { partition, pull } from 'lodash'

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
  const [todos, [sortedTodoIds]] = partition(Object.values(data), (todo) => {
    return todo && !todo?.itemIds
  })

  if (sortedTodoIds) {
    const { itemIds } = sortedTodoIds
    const orderedTodos = itemIds.map((id) => todos.find((item) => item.id === id))

    return { items: orderedTodos }
  }

  return { items: todos.reverse() }
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
    pull(todoIds, id)
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
