import { makeObservable, observable, action, computed, runInAction } from 'mobx'

import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      hasItemInEditingMode: computed,
      percentComplete: computed,
      addItem: action.bound,
      setItems: action.bound,
      deleteItem: action.bound,
    })
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  get percentComplete() {
    return Math.round(
      (this.items.filter((item) => item.isChecked).length / this.items.length) * 100,
    )
  }

  addItem() {
    this.items.unshift(new TodoListItem({ isEditing: true }, this))
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
