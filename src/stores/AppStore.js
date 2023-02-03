import { TodoListStore } from './TodoListStore'
import { todoItems } from '../mocks/todo-items'

class AppStore {
  todoList = new TodoListStore()

  loadTodoList() {
    this.todoList.setItems(todoItems)
  }
}

export default AppStore
