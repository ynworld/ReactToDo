import { makeObservable } from 'mobx'
import { TodoListStore } from './TodoListStore'

class AppStore {
  todoList = new TodoListStore()

  constructor() {
    makeObservable(this, {})
  }
}

export default AppStore
