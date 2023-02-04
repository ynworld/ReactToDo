import { makeObservable, observable, action } from 'mobx'

class TodoListItem {
  id = null
  text = ''
  isChecked = false
  isEditing = false

  constructor({ id, text, isChecked, isEditing }) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      isEditing: observable,
      toggle: action.bound,
      setIsEditing: action.bound,
    })

    this.id = id || Math.random()
    this.isChecked = isChecked
    this.text = text || 'New Todo'
    this.isEditing = isEditing
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  setIsEditing(value) {
    this.isEditing = value
  }
}

export default TodoListItem
