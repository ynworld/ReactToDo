import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import AppStore from './stores/AppStore'

import { Button, TodoList, Loading, Icon } from './components'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import './App.css'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, todoList } = appStore

  return (
    <main className="wrapper">
      {isLoading ? (
        <Loading text="Tasks are Loading" />
      ) : (
        <>
          <h1 className="title">Tasks</h1>
          <TodoList todos={todoList.items} />
          <Button
            shape="round"
            position="top-right"
            className="add-button"
            onClick={todoList.addItem}
          >
            <Icon name="PlusCircleIcon" className="add-icon" />
          </Button>
        </>
      )}
    </main>
  )
}

export default observer(App)
