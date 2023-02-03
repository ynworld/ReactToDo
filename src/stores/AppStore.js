import { TodoListStore } from './TodoListStore'
import { getTodoList } from '../api/get-todo-list'

class AppStore {
  todoList = new TodoListStore()

  loadTodoList() {
    getTodoList().then((data) => {
      this.todoList.setItems(data.items)
    })
  }
}

export default AppStore
