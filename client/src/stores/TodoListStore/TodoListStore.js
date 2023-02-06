import { makeObservable, observable, action, runInAction } from 'mobx'
import { post, del } from '../../api'

import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action.bound,
      setItems: action.bound,
      deleteItem: action.bound,
    })
  }

  addItem() {
    post('/todos', { text: 'New Todo' }).then((todoItem) => {
      runInAction(() => {
        this.items.unshift(new TodoListItem(todoItem, this))
      })
    })
  }

  deleteItem(todoItem) {
    del(`/todos/${todoItem.id}`).then(() => {
      runInAction(() => {
        this.items.remove(todoItem)
      })
    })
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item, this))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
