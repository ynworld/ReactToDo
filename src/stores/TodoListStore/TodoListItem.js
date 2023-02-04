import { makeObservable, observable, action } from 'mobx'

class TodoListItem {
  id = null
  text = ''
  isChecked = false
  isEditing = false

  constructor({ id, text, isChecked }) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      isEditing: observable,
      toggle: action.bound,
      setIsEditing: action.bound,
      editItem: action.bound,
    })

    this.id = id
    this.isChecked = isChecked
    this.text = text || ''
    this.isEditing = !id
  }

  get key() {
    return this.id || 'new-todo-item'
  }

  editItem(text) {
    this.text = text
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
