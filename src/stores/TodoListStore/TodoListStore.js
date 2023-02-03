import { makeObservable, observable, action } from 'mobx'
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

  addItem(item) {
    console.log('Adding Item')
    this.items.unshift(new TodoListItem(item))
    console.log(this.items)
  }

  setItems(items) {
    const itemModels = items.map((item) => new TodoListItem(item))

    this.items.replace(itemModels)
  }
}

export default TodoListStore
