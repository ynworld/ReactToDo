import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { iconNames } from './constants'
import AppStore from './stores/AppStore'

import { Button, TodoList, Loading, Icon } from './components'

import './App.css'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, todoList } = appStore

  return (
    <main className="wrapper">
      {/* TODO: mr. Yuriy, make it pretty please */}
      <div
        style={{
          width: `${(todoList.items.filter((item) => item.isChecked).length / todoList.items.length) * 100}%`,
          position: 'fixed',
          bottom: 0,
          left: 0,
          height: 4,
          backgroundColor: '#4fc41d',
          transition: '0.5s width ease-in-out',
        }}
      />
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
            disabled={todoList.hasItemInEditingMode}
            onClick={todoList.addItem}
          >
            <Icon name={iconNames.plusCircle} className="add-icon" />
          </Button>
        </>
      )}
    </main>
  )
}

export default observer(App)
