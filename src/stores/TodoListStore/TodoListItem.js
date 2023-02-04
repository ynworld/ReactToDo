import { makeObservable, observable, action } from 'mobx'

class TodoListItem {
  id = null
  text = ''
  isChecked = false
  isEditing = false

  constructor({ id, text, isChecked }, todoListStore) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      isEditing: observable,
      toggle: action.bound,
      setIsEditing: action,
      setText: action,
      setId: action,
    })

    this.id = id
    this.isChecked = isChecked
    this.text = text || ''
    this.isEditing = !id

    this.todoListStore = todoListStore
  }

  get key() {
    return this.id || 'new-todo-item'
  }

  delete() {
    this.todoListStore.deleteItem(this)
  }

  setText(value) {
    this.text = value
  }

  startEdit() {
    this.setIsEditing(true)
  }

  setId(id) {
    this.id = id
  }

  finishEdit() {
    this.setIsEditing(false)
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  setIsEditing(isEditing) {
    this.isEditing = isEditing
  }
}

export default TodoListItem
