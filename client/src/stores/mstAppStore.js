import { types } from 'mobx-state-tree'
import { TodoListStore } from './TodoListStore'
import { get } from '../api'

const mstAppStore = types
  .model({
    isLoading: true,
  })
  .actions((self) => ({
    loadTodoList() {
      get('/todos').then(({ items }) => {
        self.todoList.setItems(items)
        self.setIsLoading(false)
      })
    },
    setIsLoading(value) {
      self.isLoading = value
    },
  }))
  .views(() => ({
    get todoList() {
      return new TodoListStore()
    },
  }))

export default mstAppStore
