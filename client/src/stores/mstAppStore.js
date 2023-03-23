import { types, flow } from 'mobx-state-tree'
import { TodoListStore } from './TodoListStore'
import { get } from '../api'

const mstAppStore = types
  .model('AppStore', {})
  .volatile(() => ({
    isLoading: false,
  }))
  .views(() => ({
    get todoList() {
      return new TodoListStore()
    },
  }))
  .actions((self) => ({
    loadTodoList: flow(function* loadTodoList() {
      const { items } = yield get('/todos')

      self.todoList.setItems(items)
      self.setIsLoading(false)
    }),

    setIsLoading(value) {
      self.isLoading = value
    },
  }))

export default mstAppStore
