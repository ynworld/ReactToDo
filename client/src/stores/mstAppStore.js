import { types, flow } from 'mobx-state-tree'
import { mstTodoListStore } from './TodoListStore'
import { get } from '../api'

const mstAppStore = types
  .model('AppStore', {
    todoList: types.optional(types.maybe(mstTodoListStore), () => mstTodoListStore.create()),
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
        // eslint-disable-next-line
        console.log(error)
      } finally {
        self.isLoading = false
      }
    }),
  }))

export default mstAppStore
