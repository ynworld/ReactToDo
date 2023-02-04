import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import AppStore from './stores/AppStore'

import { Button, TodoList, Loading, NewTodo } from './components'
import { AddCircleIcon } from './components/icons'

import './App.css'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, isAdding, todoList, setIsAdding } = appStore

  const addItemHandler = (event) => {
    event.preventDefault()
    todoList.addItem({ text: event.target[0].value })
  }

  return (
    <main className="wrapper">
      <h1 className="title">Tasks</h1>
      {isAdding && <NewTodo addItem={addItemHandler} />}
      {isLoading ? <Loading text="Tasks are Loading" /> : <TodoList todos={todoList.items} />}
      <Button shape="round" className="top-right" onClick={() => {}}>
        <AddCircleIcon />
      </Button>
    </main>
  )
}

export default observer(App)
