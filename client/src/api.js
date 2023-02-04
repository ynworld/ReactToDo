const handleResponse = (response) => {
  const body = response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return body
}

export const get = (url) => fetch(url).then(handleResponse)

export const post = (url, data) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', },
  body: JSON.stringify(data)
}).then(handleResponse)
