import { makeObservable, observable, action, computed, reaction } from 'mobx'

import { del, put } from '../../api'

class TodoListItem {
  id = null
  text = ''
  isChecked = false

  isEditing = false

  constructor({ id, text, isChecked, isEditing }, todoListStore) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      isEditing: observable,
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
    this.isChecked = isChecked
    this.text = text
    this.isEditing = isEditing

    this.todoListStore = todoListStore

    reaction(() => this.snapshot, this.save)
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

  save = () => {
    put(`/todos/${this.id}`, this.snapshot).then(this.updateSnapshot)
  }

  updateSnapshot(updatedItem) {
    if (JSON.stringify(this.snapshot) === JSON.stringify(updatedItem)) return

    const { id, text, isChecked} = updatedItem

    this.id = id
    this.text = text
    this.isChecked = isChecked
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      this.todoListStore.deleteItem(this)
    })
  }
}

export default TodoListItem
