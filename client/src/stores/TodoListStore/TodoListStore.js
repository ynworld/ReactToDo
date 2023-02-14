import { makeObservable, observable, action, computed } from 'mobx'

import { put } from '../../api'

import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      hasItemInEditingMode: computed,
      checkedItemsCount: computed,
      percentComplete: computed,
      addItem: action.bound,
      moveItem: action.bound,
      deleteItem: action.bound,
      setItems: action.bound,
      resetItems: action.bound,
      reorderItems: action.bound,
    })
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  get checkedItemsCount() {
    return this.items.filter((item) => item.isChecked).length
  }

  get percentComplete() {
    if (this.items.length === 0) return 0

    return (this.checkedItemsCount / this.items.length) * 100
  }

  addItem() {
    this.items.unshift(new TodoListItem({ isEditing: true }, 0, this))
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  moveItem(fromIndex, toIndex) {
    const [itemToMove] = this.items.splice(fromIndex, 1)
    this.items.splice(toIndex, 0, itemToMove)
  }

  reorderItems() {
    const itemIds = this.items.map((item) => item.id)
    put(`/todos/reorder`, { itemIds }).then((items) => {
      this.setItems(items)
    })
  }

  resetItems() {
    this.setItems(this.items)
  }

  setItems(items) {
    const itemModels = items.map((item, index) => new TodoListItem(item, index, this))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
