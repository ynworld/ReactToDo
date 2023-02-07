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
      toggle: action.bound,
      delete: action.bound,
      setIsEditing: action.bound,
      setText: action.bound,
    })

    this.id = id
    this.isChecked = isChecked
    this.text = text
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
    this.text = text
  }

  update() {
    put(`/todos/${this.id}`, { id: this.id, text: this.text, isChecked: this.isChecked }).then(
      (todoItem) => {
        this.setText(todoItem.text)
      },
    )
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      this.todoListStore.deleteItem(this)
    })
  }
}

export default TodoListItem
