import { makeObservable, observable, action } from 'mobx'

import { post, del } from '../../api'

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
      toggle: action.bound,
      delete: action.bound,
      setIsEditing: action.bound,
      setText: action.bound,
    })

    this.id = id || Math.random()
    this.isChecked = isChecked
    this.text = text || ''
    this.isEditing = isEditing

    this.todoListStore = todoListStore
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  setIsEditing(isEditing) {
    this.isEditing = isEditing
  }

  setText(text) {
    this.text = text
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      this.todoListStore.deleteItem(this)
    })
  }
}

export default TodoListItem
