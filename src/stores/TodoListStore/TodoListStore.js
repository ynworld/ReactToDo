import { makeObservable, observable, action, computed } from 'mobx'
import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      hasItemInEditingMode: computed,
      items: observable,
      setItems: action.bound,
      addNewItem: action.bound,
      deleteItem: action.bound,
    })
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  addNewItem(item) {
    this.items.unshift(new TodoListItem(item))
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
