import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import AppStore from './stores/AppStore'

import { Button, TodoList, Loading } from './components'
import { AddCircleIcon } from './components/icons'

import './App.css'

const App = () => {
  const [appStore] = useState(() => new AppStore())
  const isLoading = appStore.isLoading

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  return (
    <div className="wrapper">
      <h1 className="title">Tasks</h1>
      {isLoading && <Loading text="Tasks are Loading" />}
      <TodoList todos={appStore.todoList.items} />
      <Button shape="round" onClick={appStore.todoList.addItem}>
        <AddCircleIcon />
      </Button>
    </div>
  )
}

export default observer(App)
