import { types } from 'mobx-state-tree'
import { TodoListStore } from './TodoListStore'

const AppStore = types.model('AppStore', {
  todoList: types.optional(TodoListStore, {}),
})

export default AppStore
