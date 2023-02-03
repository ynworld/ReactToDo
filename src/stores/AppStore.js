import { TodoListStore } from './TodoListStore'
import { getTodoList } from '../api/get-todo-list'
import { makeObservable, observable } from 'mobx'

class AppStore {
  todoList = new TodoListStore()
  isLoading = null

  constructor() {
    makeObservable(this, {
      isLoading: observable,
    })
  }

  loadTodoList() {
    this.isLoading = true
    getTodoList().then((data) => {
      this.todoList.setItems(data.items)
      this.isLoading = false
    })
  }
}

export default AppStore
