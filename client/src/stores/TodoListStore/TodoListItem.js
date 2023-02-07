import { makeObservable, observable, action, computed } from 'mobx'

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
      updateSnapshot: action.bound,
    })

    this.id = id
    this.isChecked = isChecked
    this.text = text
    this.isEditing = isEditing

    this.todoListStore = todoListStore
  }

  get snapshot() {
    return { id: this.id, text: this.text, isChecked: this.isChecked }
  }

  get canEdit() {
    return !this.todoListStore.hasItemInEditingMode
  }

  toggle() {
    this.isChecked = !this.isChecked
    this.update()
  }

  startEdit() {
    this.isEditing = true
  }

  finishEdit() {
    this.isEditing = false
  }

  save(data) {
    put(`/todos/${this.id}`, { ...this.snapshot, ...data }).then(this.updateSnapshot)
  }

  updateSnapshot({ id, text, isChecked }) {
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
