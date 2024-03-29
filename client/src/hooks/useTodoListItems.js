import { useState, useEffect } from 'react'
import { get } from '../api'
import { logError } from '../helpers'

const useTodoListItems = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    get('/todos')
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
