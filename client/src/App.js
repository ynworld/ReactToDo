import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { iconNames } from './constants'
import AppStore from './stores/AppStore'

import classnames from 'classnames'

import { Button, CompletionBar, TodoList, Loading, Icon } from './components'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, todoList } = appStore

  return (
    <main className="mx-auto p-4 sm:max-w-2xl">
      <CompletionBar percentComplete={todoList.percentComplete} />

      {isLoading ? (
        <Loading text="Tasks are Loading" />
      ) : (
        <>
          <header className="flex justify-between items-center">
            <h1 className="title text-7xl text-gray-800 font-bold">Tasks</h1>
            <Button
              className={classnames(
                'p-2 rounded-full bg-primary shadow-lg shadow-gray-400',
                'hover:bg-primary-dark focus:bg-primary-dark active:shadow-md',
                'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
                'transition-all duration-300',
              )}
              disabled={todoList.hasItemInEditingMode}
              onClick={todoList.addItem}
            >
              <Icon name={iconNames.plusCircle} className="w-14 h-14 text-gray-100" />
            </Button>
          </header>
          <TodoList todos={todoList.items} />
        </>
      )}
    </main>
  )
}

export default observer(App)
