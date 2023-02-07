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
      setIsEditing: action,
      setText: action,
      setCheck: action,
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

  setCheck(checked) {
    this.isChecked = checked
  }

  setIsEditing(isEditing) {
    this.isEditing = isEditing
  }

  setText(text) {
    this.text = text
  }

  update() {
    put(`/todos/${this.id}`, this.snapshot).then((todoItem) => {
      this.setText(todoItem.text)
      this.setCheck(todoItem.isChecked)
    })
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      this.todoListStore.deleteItem(this)
    })
  }
}

export default TodoListItem
