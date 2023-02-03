import { TodoListStore } from './TodoListStore'
import { getTodoList } from '../api/get-todo-list'
import { makeObservable, observable, action } from 'mobx'

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
    this.setIsLoading(true)
    getTodoList().then((data) => {
      this.todoList.setItems(data.items)
      this.setIsLoading(false)
    })
  }
}

export default AppStore
