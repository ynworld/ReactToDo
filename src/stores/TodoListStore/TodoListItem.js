import { makeObservable, observable, action } from 'mobx'

class TodoListItem {
  id = null
  text = ''
  isChecked = false
  isEditing = false
  isNew = true

  constructor({ id, text, isChecked, isEditing, isNew }) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      isEditing: observable,
      isNew: observable,
      toggle: action.bound,
      setIsEditing: action.bound,
      setNotIsNew: action.bound,
      editItem: action.bound,
    })

    this.id = id || Math.random()
    this.isChecked = isChecked
    this.text = text || ''
    this.isEditing = isEditing
    this.isNew = isNew
  }

  editItem(text) {
    this.text = text
    this.setIsEditing(false)
    this.setNotIsNew()
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  setIsEditing(value) {
    this.isEditing = value
  }

  setNotIsNew() {
    this.isNew = false
  }
}

export default TodoListItem
