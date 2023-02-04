import { makeObservable, observable, action } from 'mobx'
import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      setItems: action.bound,
      addNewItem: action.bound,
      deleteItem: action.bound,
    })
  }

  addNewItem(item) {
    this.items.unshift(new TodoListItem(item))
  }

  deleteItem(id) {
    const deleteIndex = this.items.findIndex((item) => item.id === id)
    this.items.splice(deleteIndex, 1)
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
