/* eslint-disable max-lines */

import { makeObservable, observable, action, computed, reaction } from 'mobx'

import { format } from 'date-fns'

import { del, put } from '../../api'

class TodoListItem {
  id = null

  index = null

  text = ''

  isChecked = false

  isImportant = false

  createdAt = null

  constructor({ id, text, isChecked, isImportant, createdAt }, index, todoListStore) {
    makeObservable(this, {
      createdAt: observable,
      delete: action.bound,
      displayDate: computed,
      id: observable,
      index: observable,
      isChecked: observable,
      isImportant: observable,
      setText: action,
      snapshot: computed,
      text: observable,
      toggle: action.bound,
      toggleIsImportant: action.bound,
      updateSnapshot: action.bound,
    })

    this.id = id
    this.isChecked = isChecked || false
    this.text = text || ''
    this.index = index ?? null
    this.isImportant = isImportant || false
    this.createdAt = createdAt || null

    this.todoListStore = todoListStore

    reaction(() => this.snapshot, this.save)
  }

  get displayDate() {
    if (!this.createdAt) return null

    return format(this.createdAt, 'P')
  }

  get snapshot() {
    return {
      createdAt: this.createdAt,
      id: this.id,
      isChecked: this.isChecked,
      isImportant: this.isImportant,
      text: this.text,
    }
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  setText(value) {
    this.text = value
  }

  save = (snapshot) => {
    put(`/todos/${this.id}`, snapshot).then(this.updateSnapshot)
  }

  toggleIsImportant() {
    this.isImportant = !this.isImportant
  }

  updateSnapshot(updatedItem) {
    if (JSON.stringify(this.snapshot) === JSON.stringify(updatedItem)) return

    const { id, text, isChecked, isImportant, createdAt } = updatedItem

    this.id = id
    this.text = text
    this.isChecked = isChecked
    this.isImportant = isImportant
    this.createdAt = createdAt
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      this.todoListStore.deleteItem(this)
    })
  }
}

export default TodoListItem
