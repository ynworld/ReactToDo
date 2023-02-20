/* eslint-disable max-lines */

import { makeObservable, observable, action, computed, reaction } from 'mobx'
import { move } from '../../helpers/array'
import { makeObservable, observable, action, computed, reaction } from 'mobx'
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
      resetItems: action.bound,
      setItems: action.bound,
      sort: action.bound,
    })

    reaction(() => this.importantItems.length, this.sort)
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
    return this.items.filter((item) => !item.isImportant).sort((a, b) => a.index - b.index)
  }

  get percentComplete() {
    if (this.items.length === 0) return 0

    return (this.checkedItemsCount / this.items.length) * 100
  }

  sort = () => {
    this.items.replace([...this.importantItems, ...this.regularItems])
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
