import { useEffect, useState } from 'react'

import AppStore from './stores/AppStore'

import { Button, TodoList } from './components'
import { AddCircleIcon } from './components/icons'

import './App.css'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  return (
    <div className="wrapper">
      <h1 className="title">Tasks</h1>
      <TodoList todos={appStore.todoList.items} />
      <Button type="submit" shape="round" addItem={appStore.todoList.addItem}>
        <AddCircleIcon />
      </Button>
    </div>
  )
}

export default App
