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
      try {
        self.isLoading = true
        const { items } = yield get('/todos')

        self.todoList.setItems(items)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      } finally {
        self.isLoading = false
      }
    }),
  }))

export default mstAppStore
