import { makeObservable, observable, action } from 'mobx'
import { TodoListStore } from './TodoListStore'
import { get } from '../api'

class AppStore {
  todoList = new TodoListStore()

  isLoading = true

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      setIsLoading: action,
    })
  }

  setIsLoading(value) {
    this.isLoading = value
  }

  loadTodoList() {
    get('/todos').then(({ items }) => {
      this.todoList.setItems(items)
      this.setIsLoading(false)
    })
  }
}

export default AppStore
