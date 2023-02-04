import { makeObservable, observable, action, runInAction } from 'mobx'
import { post } from '../../api'

import TodoListItem from './TodoListItem'

class TodoListStore {
  items = []

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action.bound,
      setItems: action.bound,
    })
  }

  addItem() {
    post('/api/todos', { text: 'New Todo' }).then(({ todoItem }) => {
      runInAction(() => {
        this.items.unshift(new TodoListItem(todoItem))
      })
    })
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
