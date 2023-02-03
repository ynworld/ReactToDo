import { makeObservable, observable, action } from 'mobx'

class TodoListItem {
  id = null
  text = ''
  isChecked = false

  constructor({ id, text, isChecked }) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      toggle: action.bound,
    })

    this.id  = id || Math.random()
    this.isChecked = isChecked
    this.text = text || 'New Todo'
  }

  toggle() {
    this.isChecked = !this.isChecked
  }
}

export default TodoListItem
