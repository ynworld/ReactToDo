import { makeObservable, observable, action, computed } from 'mobx'

import { post, del, put } from '../../api'

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

  get canEdit() {
    return !this.todoListStore.hasItemInEditingMode
  }

  toggle() {
    put(`/todos/${this.id}`, { isChecked: !this.isChecked }).then((todoItem) => {
      this.isChecked = todoItem.isChecked
    })
  }

  setIsEditing(isEditing) {
    this.isEditing = isEditing
  }

  setText(text) {
    put(`/todos/${this.id}`, { text: text }).then((todoItem) => {
      this.text = todoItem.text
    })
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      this.todoListStore.deleteItem(this)
    })
  }
}

export default TodoListItem
