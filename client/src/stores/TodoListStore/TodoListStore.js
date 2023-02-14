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
      updateMoveOnServer: action.bound,
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
    this.items.unshift(new TodoListItem({ isEditing: true }, this))
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  moveItem(fromIndex, toIndex) {
    const [itemToMove] = this.items.splice(fromIndex, 1)
    this.items.splice(toIndex, 0, itemToMove)
  }

  updateMoveOnServer(todoItem, toIndex) {
    put(`/todos`, { ...todoItem.snapshot, toIndex: toIndex }).then(this.setItems)
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item, this))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
