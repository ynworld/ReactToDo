import { TodoListStore } from './TodoListStore'
import { makeObservable, observable, action } from 'mobx'
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
    get('/api/todo-list').then(({ todoList }) => {
      this.todoList.setItems(todoList)
      this.setIsLoading(false)
    })
  }
}

export default AppStore
