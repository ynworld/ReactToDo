import { types, flow } from 'mobx-state-tree'
import { TodoListStore } from './TodoListStore'
import { get } from '../api'
import { logError } from '../helpers'

const AppStore = types
  .model('AppStore', {
    todoList: types.optional(TodoListStore, {}),
  })
  .volatile(() => ({
    isLoading: false,
  }))
  .actions((self) => ({
    loadTodoList: flow(function* loadTodoList() {
      try {
        self.isLoading = true
        const { items } = yield get('/todos')

        self.todoList.setItems(items)
      } catch (error) {
        logError(error, 'List Load Error:')
      } finally {
        self.isLoading = false
      }
    }),
  }))

export default AppStore
