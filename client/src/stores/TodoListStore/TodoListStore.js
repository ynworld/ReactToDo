import { makeObservable, observable, action, computed, runInAction } from 'mobx'
import { post, del } from '../../api'

import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      hasItemInEditingMode: computed,
      addItem: action.bound,
      setItems: action.bound,
      deleteItem: action.bound,
    })
  }

  get hasItemInEditingMode() {
    return this.items.some((item) => item.isEditing)
  }

  addItem() {
    post('/todos', { text: 'New To Do' }).then((todoItem) => {
      runInAction(() => {
        console.log(todoItem)
        this.items.unshift(new TodoListItem({ ...todoItem, isEditing: true, text: '' }, this))
      })
    })
  }

  deleteItem(todoItem) {
    this.items.remove(todoItem)
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item, this))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
