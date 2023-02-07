import { makeObservable, observable, action, computed, runInAction } from 'mobx'

import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      hasItemInEditingMode: computed,
      addItem: action.bound,
      setItems: action.bound,
      deleteItem: action.bound,
    })
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  addItem() {
    this.items.unshift(new TodoListItem({ isEditing: true, text: '', isChecked: false }, this))
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item, this))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
