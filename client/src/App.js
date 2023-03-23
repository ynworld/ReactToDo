import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { loadData } from './hooks'

import AppStore from './stores/AppStore'

import { CompletionBar, TodoList, Loading, AddItemButtonWithModal } from './components'

const App = () => {
  const [appStore] = useState(() => new AppStore())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(
    () => async () => {
      const { items } = await loadData('/todos')

      appStore.todoList.setItems(items)

      setIsLoading(false)
    },
    [appStore],
  )

  const { todoList } = appStore

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
