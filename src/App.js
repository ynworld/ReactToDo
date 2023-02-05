import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import AppStore from './stores/AppStore'

import { Button, TodoList, Loading } from './components'
import { AddCircleIcon } from './components/icons'

import './App.css'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, todoList } = appStore

  return (
    <main className="wrapper">
      <h1 className="title">Tasks</h1>
      <Button
        disabled={todoList.hasItemInEditingMode || isLoading}
        shape="round"
        className="add-button top-right"
        onClick={todoList.addNewItem}
      >
        <AddCircleIcon className="add-icon" />
      </Button>
      {isLoading ? <Loading text="Tasks are Loading" /> : <TodoList todoList={todoList} />}
    </main>
  )
}

export default observer(App)
