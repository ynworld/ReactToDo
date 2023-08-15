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
  const { items } = data

  if (response.status !== 200) {
    throw new Error(data.message)
  }

  const body = []

  // TODO: Use more efficient iteration logic
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(items)) {
    body.push({
      createdAt: value.createdAt,
      description: value.description,
      id: key,
      isChecked: value.isChecked,
      isImportant: value.isImportant,
      text: value.text,
    })
  }

  return { items: body.reverse() }
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

  const response = await fetch(url, {
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const body = await response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return { ...todo, id: body.name }
}

// TODO: Make delete work with Firebase
const del = (url) =>
  fetch(url, {
    method: 'DELETE',
  }).then(handleResponse)

const put = (url, data) =>
  fetch(url, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  }).then(handleResponse)

export { del, get, post, put }
