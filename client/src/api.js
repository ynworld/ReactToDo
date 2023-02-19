const handleResponse = (response) => {
  const body = response.json()

  if (response.status !== 200) {
    throw new Error(body.message)
  }

  return body
}

export const get = (url) => fetch(url).then(handleResponse)

export const post = (url, data) =>
  fetch(url, {
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(handleResponse)

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
