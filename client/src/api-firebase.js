const firebaseURL = process.env.REACT_APP_FIREBASE_URL

const handleResponse = (response) => {
  const body = response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return body
}

const transformFirebaseData = async (response) => {
  const data = await response.json()

  if (response.status !== 200) {
    throw new Error(data.message)
  }

  const todos = Array.from(Object.values(data)).filter((todo) => !todo.itemIds)

  const todoOrder = Array.from(Object.values(data)).filter((todo) => todo.itemIds)

  if (todoOrder.length !== 0) {
    const { itemIds } = Array.from(Object.values(data)).filter((todo) => todo.itemIds)[0]

    const orderedTodos = itemIds.map((id) => todos.find((item) => item.id === id))

    return { items: orderedTodos }
  }

  return { items: todos.reverse() }
}

const get = (url) => fetch(`${firebaseURL}${url}.json`).then(transformFirebaseData)

const post = async (url, data) => {
  const todo = {
    ...data,
    createdAt: Date.now(),
    id: Date.now(),
    isChecked: false,
    isImportant: false,
  }

  const response = await fetch(`${firebaseURL}${url}.json`, {
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const body = await response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return { ...todo }
}

const del = (url) =>
  fetch(`${firebaseURL}${url}.json`, {
    method: 'DELETE',
  }).then(handleResponse)

const put = (url, data) =>
  fetch(`${firebaseURL}${url}.json`, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  }).then(handleResponse)

export { del, get, post, put }
