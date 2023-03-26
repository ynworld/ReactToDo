import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import AppStore from './stores/AppStore'

import { CompletionBar, TodoList, Loading, AddItemButtonWithModal } from './components'
import useTodoListItems from './hooks/useTodoListItems'

const App = () => {
  const [appStore] = useState(() => AppStore.create())
  const { isLoading, items } = useTodoListItems()

  const { todoList } = appStore

  useEffect(() => {
    if (!items) return
    todoList.setItems(items)
  }, [todoList, items])

  return (
    <main className="mx-auto p-4 sm:max-w-md">
      <CompletionBar percentComplete={todoList.percentComplete} />

      {isLoading ? (
        <Loading text="Tasks are Loading" />
      ) : (
        <>
          <header className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-800">Tasks</h1>
            <AddItemButtonWithModal todoList={todoList} />
          </header>
          <TodoList todoListStore={todoList} />
        </>
      )}
    </main>
  )
}

export default observer(App)
