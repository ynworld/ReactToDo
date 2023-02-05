import { makeObservable, observable, action } from 'mobx'

class TodoListItem {
  id = null
  text = ''
  isChecked = false

  constructor({ id, text, isChecked, todoListStore }) {
    makeObservable(this, {
      todoListStore,
      text: observable,
      isChecked: observable,
      toggle: action.bound,
      delete: action.bound,
    })

    this.id = id || Math.random()
    this.isChecked = isChecked
    this.text = text || 'New Todo'
  }

  delete() {
    this.todoListStore.deleteItem(this)
  }

  toggle() {
    this.isChecked = !this.isChecked
  }
}

export default TodoListItem
