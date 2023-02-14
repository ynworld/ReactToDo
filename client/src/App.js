import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { iconNames } from './constants'
import AppStore from './stores/AppStore'

import classnames from 'classnames'

import { CompletionBar, TodoList, Loading, Icon } from './components'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, todoList } = appStore

  const handleAddItem = () => {
    todoList.addItem()
    todoList.resetItems()
  }

  return (
    <main className="mx-auto p-4 sm:max-w-md">
      <CompletionBar percentComplete={todoList.percentComplete} />

      {isLoading ? (
        <Loading text="Tasks are Loading" />
      ) : (
        <>
          <header className="flex justify-between items-center">
            <h1 className="title text-4xl text-gray-800 font-bold">Tasks</h1>
            <button
              className={classnames(
                'p-2 rounded-full bg-primary shadow-lg shadow-gray-400',
                'hover:bg-primary-dark focus:bg-primary-dark active:shadow-md',
                'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
                'transition-all duration-300',
              )}
              disabled={todoList.hasItemInEditingMode}
              onClick={handleAddItem}
            >
              <Icon name={iconNames.plusCircle} className="w-10 h-10 text-white" />
            </button>
          </header>
          <TodoList todos={todoList.items} />
        </>
      )}
    </main>
  )
}

export default observer(App)
