import { TodoListStore } from './TodoListStore'
import { getTodoList } from '../api/get-todo-list'
import { makeObservable, observable, action } from 'mobx'

class AppStore {
  todoList = new TodoListStore()
  isLoading = true
  isAdding = false

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isAdding: observable,
      setIsLoading: action.bound,
      setIsAdding: action.bound,
    })
  }

  setIsLoading(value) {
    this.isLoading = value
  }

  setIsAdding(value) {
    this.isAdding = value
  }

  loadTodoList() {
    this.setIsLoading(true)
    getTodoList().then((data) => {
      this.todoList.setItems(data.items)
      this.setIsLoading(false)
    })
  }
}

export default AppStore
