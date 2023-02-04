import { makeObservable, observable, action } from 'mobx'
import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      setItems: action.bound,
    })
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
