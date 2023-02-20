/* eslint max-lines: 'off' */

import { makeObservable, observable, action, computed, reaction } from 'mobx'
import { move } from '../../helpers/array'
import { makeObservable, observable, action, computed, reaction } from 'mobx'
import { put } from '../../api'

import TodoListItem from './TodoListItem'

const sortByDate = (a, b) => {
  const dateA = new Date(a.createdAt)
  const dateB = new Date(b.createdAt)

  if (dateA < dateB) {
    return 1
  }
  if (dateA > dateB) {
    return -1
  }
  return 0
}

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      addItem: action.bound,
      checkedItemsCount: computed,
      deleteItem: action.bound,
      hasItemInEditingMode: computed,
      importantItems: computed,
      importantItemsCount: computed,
      items: observable,
      moveItem: action.bound,
      percentComplete: computed,
      reorderItems: action.bound,
      resetItems: action.bound,
      setItems: action.bound,
      sort: action.bound,
    })

    reaction(() => this.importantItemsCount, this.sort)
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  get checkedItemsCount() {
    return this.items.filter((item) => item.isChecked).length
  }

  get importantItemsCount() {
    return this.items.filter((item) => item.isImportant).length
  }

  get importantItems() {
    return this.items.filter((item) => item.isImportant).sort(sortByDate)
  }

  get percentComplete() {
    if (this.items.length === 0) return 0

    return (this.checkedItemsCount / this.items.length) * 100
  }

  sort() {
    const notImportantItems = this.items.filter((item) => !item.isImportant)
    this.items.replace([...this.importantItems, ...notImportantItems])
  }

  addItem() {
    this.items.unshift(new TodoListItem({ isEditing: true }, 0, this))
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  moveItem(fromIndex, toIndex) {
    this.items.replace(move(this.items, fromIndex, toIndex))
  }

  reorderItems() {
    const itemIds = this.items.map((item) => item.id)

    put(`/todos/reorder`, { itemIds })
  }

  resetItems() {
    this.setItems(this.items)
  }

  setItems(items) {
    const itemModels = items.map((item, index) => new TodoListItem(item, index, this))

    this.items.replace(itemModels)
    this.sort()
  }
}

export default TodoListStore
