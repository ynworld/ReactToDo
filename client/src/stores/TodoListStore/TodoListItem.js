/* eslint-disable max-lines */

import { makeObservable, observable, action, computed, reaction } from 'mobx'

import { parseISO, format } from 'date-fns'

import { del, put, post } from '../../api'

class TodoListItem {
  id = null

  index = null

  text = ''

  isChecked = false

  isEditing = false

  isImportant = false

  createdAt = null

  constructor({ id, text, isChecked, isEditing, isImportant, createdAt }, index, todoListStore) {
    makeObservable(this, {
      canEdit: computed,
      createdAt: observable,
      delete: action.bound,
      displayDate: computed,
      finishEdit: action,
      id: observable,
      index: observable,
      isChecked: observable,
      isEditing: observable,
      isImportant: observable,
      setText: action,
      snapshot: computed,
      startEdit: action,
      text: observable,
      toggle: action.bound,
      toggleIsImportant: action.bound,
      updateSnapshot: action.bound,
    })

    this.id = id
    this.isChecked = isChecked || false
    this.text = text || ''
    this.isEditing = isEditing || false
    this.index = index ?? null
    this.isImportant = isImportant || false
    this.createdAt = createdAt || null

    this.todoListStore = todoListStore

    reaction(() => this.snapshot, this.save)
  }

  get displayDate() {
    if (!this.createdAt) return null

    return format(parseISO(this.createdAt), 'P')
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

  get canEdit() {
    return !this.todoListStore.hasItemInEditingMode
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  startEdit() {
    this.isEditing = true
  }

  finishEdit() {
    this.isEditing = false
  }

  setText(value) {
    this.text = value
  }

  save = (snapshot) => {
    if (this.id) {
      put(`/todos/${this.id}`, snapshot).then(this.updateSnapshot)
    } else {
      post('/todos', { text: snapshot.text }).then(this.updateSnapshot)
    }
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
    if (this.id) {
      del(`/todos/${this.id}`).then(() => {
        this.todoListStore.deleteItem(this)
      })
    } else {
      this.todoListStore.deleteItem(this)
    }
  }
}

export default TodoListItem
