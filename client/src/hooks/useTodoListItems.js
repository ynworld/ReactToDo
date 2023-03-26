import { useState, useEffect } from 'react'
import { get } from '../api'
import { logError } from '../helpers'

const useTodoListItems = () => {
  const [items, setItems] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(
    () => async () => {
      setIsLoading(true)

      try {
        const { items: todos } = await get('/todos')

        setItems(todos)
      } catch (error) {
        logError(error, 'Loading Error:')
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  return { isLoading, items }
}

export default useTodoListItems
