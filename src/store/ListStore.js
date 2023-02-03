import { makeObservable, observable, action } from 'mobx'
import ListItem from './ListItem'

class ListStore {
  items = []
  isAdding = false

  constructor(items) {
    makeObservable(this, {
      items: observable,
      isAdding: observable,
      addItem: action.bound,
      showAddForm: action.bound,
    })
    this.items = items
  }

  showAddForm() {
    this.isAdding = true
  }

  addItem(item) {
    this.items = [new ListItem(item), ...this.items]
    this.isAdding = false
  }
}

export default ListStore
