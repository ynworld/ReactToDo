import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { iconNames } from './constants'
import AppStore from './stores/AppStore'

import { Button, CompletionBar, TodoList, Loading, Icon } from './components'

const App = () => {
  const [appStore] = useState(() => new AppStore())

  useEffect(() => {
    appStore.loadTodoList()
  }, [])

  const { isLoading, todoList } = appStore

  return (
    <main className="relative m-auto p-6 max-w-2xl">
      <CompletionBar percentComplete={todoList.percentComplete} />

      {isLoading ? (
        <Loading text="Tasks are Loading" />
      ) : (
        <>
          <h1 className="title text-8xl text-gray-800 font-extrabold">Tasks</h1>
          <TodoList todos={todoList.items} />
          <Button
            position="top-right"
            className={classnames(
              'w-20 h-20 rounded-full bg-primary shadow-lg shadow-gray-400',
              'hover:bg-primary-dark focus:bg-primary-dark active:shadow-md', 
              'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400', 
              'transition-all duration-300',
            )}
            disabled={todoList.hasItemInEditingMode}
            onClick={todoList.addItem}
          >
            <Icon name={iconNames.plusCircle} className="w-3/4 text-gray-100" />
          </Button>
        </>
      )}
    </main>
  )
}

export default observer(App)
