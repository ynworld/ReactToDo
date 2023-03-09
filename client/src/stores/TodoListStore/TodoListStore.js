/* eslint-disable max-lines */

import { makeObservable, observable, action, computed } from 'mobx'
import { move } from '../../helpers/array'
import { put } from '../../api'
import { sortByDate } from '../../helpers'
import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      addItem: action.bound,
      checkedItemsCount: computed,
      deleteItem: action.bound,
      hasItemInEditingMode: computed,
      importantItems: computed,
      items: observable,
      moveItem: action.bound,
      percentComplete: computed,
      regularItems: computed,
      reorderItems: action.bound,
      setItems: action.bound,
    })
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  get checkedItemsCount() {
    return this.items.filter((item) => item.isChecked).length
  }

  get importantItems() {
    return this.items.filter((item) => item.isImportant).sort(sortByDate)
  }

  get regularItems() {
    return this.items.filter((item) => !item.isImportant)
  }

  get percentComplete() {
    if (this.items.length === 0) return 0

    return (this.checkedItemsCount / this.items.length) * 100
  }

  addItem(todoItem) {
    this.items.unshift(new TodoListItem({ ...todoItem }, 0, this))
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  moveItem(fromIndex, toIndex) {
    const newItems = [...this.importantItems, ...move(this.regularItems, fromIndex, toIndex)]

    this.items.replace(newItems)
  }

  reorderItems() {
    const itemIds = this.items.map((item) => item.id)

    put(`/todos/reorder`, { itemIds })
  }

  setItems(items) {
    const itemModels = items.map((item, index) => new TodoListItem(item, index, this))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
