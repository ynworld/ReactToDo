import { makeObservable, observable, action } from 'mobx'
import ListItem from './ListItem'

class ListStore {
  items = []

  constructor(items) {
    makeObservable(this, {
      items: observable,
      addItem: action.bound,
    })
    this.items = items
  }
  addItem(item) {
    this.items.push(new ListItem(item))
  }
}

export default ListStore
