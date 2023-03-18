import { useCallback, useState } from 'react'

const useBoolean = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue(!value)
  }, [value])

  const handlers = { setFalse, setTrue, setValue, toggle }

  return [value, handlers]
}

export default useBoolean
