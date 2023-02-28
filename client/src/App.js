import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import classnames from 'classnames'
import { iconNames } from './constants'
import AppStore from './stores/AppStore'

import { CompletionBar, TodoList, Loading, Icon } from './components'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [appStore])

  const { isLoading, todoList } = appStore

  const handleAddItem = () => {
    todoList.addItem()
  }

  return (
    <main className="mx-auto p-4 sm:max-w-md">
      <CompletionBar percentComplete={todoList.percentComplete} />

      {isLoading ? (
        <Loading text="Tasks are Loading" />
      ) : (
        <>
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-800">Tasks</h1>
            <button
              className={classnames(
                'rounded-full bg-primary p-2 shadow-lg shadow-gray-400',
                'hover:bg-primary-dark active:bg-primary-dark active:shadow-md',
                'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
                'transition-all duration-300',
              )}
              disabled={todoList.hasItemInEditingMode}
              onClick={handleAddItem}
              type="button"
            >
              <Icon className="h-10 w-10 text-white" name={iconNames.plusCircle} />
            </button>
          </header>
          <TodoList todoListStore={todoList} />
        </>
      )}
    </main>
  )
}

export default observer(App)
