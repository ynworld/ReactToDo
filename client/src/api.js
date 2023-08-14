const useFirebase = process.env.REACT_APP_FIREBASE

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

  return { items: body }
}

export const get = (url) => fetch(url).then(useFirebase ? transformFirebaseData : handleResponse)

export const post = async (url, data) => {
  if (useFirebase) {
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

    return { ...todo, key: body.name }
  }

  const response = await fetch(url, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const body = await response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return body
}

export const del = (url) =>
  fetch(url, {
    method: 'DELETE',
  }).then(handleResponse)

export const put = (url, data) =>
  fetch(url, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  }).then(handleResponse)
