import { useState, useEffect } from 'react'
import * as api from '../api'
import { logError } from '../helpers'

const { get } = api.default

const useTodoListItems = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    get(process.env.REACT_APP_API_URL)
      .then(({ items: todos }) => {
        setItems(todos)
      })
      .catch((error) => {
        logError(error, 'useTodoListItems error:')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { isLoading, items }
}

export default useTodoListItems
