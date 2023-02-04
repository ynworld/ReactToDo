import { TodoListStore } from './TodoListStore'
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
    fetch('/api/todo-list').then((response) => response.json()).then(({ todoList }) => {
      this.todoList.setItems(todoList)
      this.setIsLoading(false)
    })
  }
}

export default AppStore
