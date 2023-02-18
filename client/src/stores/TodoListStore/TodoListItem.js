import { makeObservable, observable, action, computed, reaction } from 'mobx'

import { del, put, post } from '../../api'

class TodoListItem {
  id = null

  index = null

  text = ''

  isChecked = false

  isEditing = false

  constructor({ id, text, isChecked, isEditing }, index, todoListStore) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      isEditing: observable,
      id: observable,
      index: observable,
      key: computed,
      canEdit: computed,
      snapshot: computed,
      toggle: action.bound,
      delete: action.bound,
      finishEdit: action,
      startEdit: action,
      updateSnapshot: action.bound,
      setText: action,
    })

    this.id = id
    this.isChecked = isChecked || false
    this.text = text || ''
    this.isEditing = isEditing || false
    this.index = index ?? null

    this.todoListStore = todoListStore

    reaction(() => this.snapshot, this.save)
  }

  get key() {
    return this.id || 'new-item'
  }

  get snapshot() {
    return { id: this.id, text: this.text, isChecked: this.isChecked }
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

  updateSnapshot(updatedItem) {
    if (JSON.stringify(this.snapshot) === JSON.stringify(updatedItem)) return

    const { id, text, isChecked } = updatedItem

    this.id = id
    this.text = text
    this.isChecked = isChecked
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
