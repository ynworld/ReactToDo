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
      editItem: action.bound,
    })

    this.id = id || Math.random()
    this.isChecked = isChecked
    this.text = text || ''
    this.isEditing = isEditing
  }

  editItem(text) {
    this.text = text
    this.setIsEditing(false)
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  setIsEditing(value) {
    this.isEditing = value
  }
}

export default TodoListItem
