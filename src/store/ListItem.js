import { makeObservable, observable, action } from 'mobx'

class ListItem {
  id = Math.random()
  title = ''
  isChecked = false

  constructor(title) {
    makeObservable(this, {
      title: observable,
      isChecked: observable,
      toggle: action.bound,
    })
    this.title = title
  }

  toggle() {
    this.isChecked = !this.isChecked
  }
}

export default ListItem
