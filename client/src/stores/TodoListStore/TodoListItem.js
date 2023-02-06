import { makeObservable, observable, action, runInAction } from 'mobx'

import { post, del } from '../../api'

class TodoListItem {
  id = null
  text = ''
  isChecked = false

  constructor({ id, text, isChecked }, todoListStore) {
    makeObservable(this, {
      text: observable,
      isChecked: observable,
      toggle: action.bound,
      delete: action.bound,
    })

    this.id = id || Math.random()
    this.isChecked = isChecked
    this.text = text || 'New Todo'

    this.todoListStore = todoListStore
  }

  toggle() {
    this.isChecked = !this.isChecked
  }

  delete() {
    del(`/todos/${this.id}`).then(() => {
      runInAction(() => {
        this.todoListStore.deleteItem(this)
      })
    })
  }
}

export default TodoListItem
