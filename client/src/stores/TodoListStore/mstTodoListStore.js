import { types } from 'mobx-state-tree'
import mstTodoListItem from './mstTodoListItem'
import { sortByDate } from '../../helpers'
import { move } from '../../helpers/array'
import { put } from '../../api'

const mstTodoListStore = types
  .model('TodoList', {
    items: types.array(types.optional(mstTodoListItem, {})),
  })
  .views((self) => ({
    get checkedItemsCount() {
      return self.items.filter((item) => item.isChecked).length
    },

    get importantItems() {
      return self.items.filter((item) => item.isImportant).sort(sortByDate)
    },

    get percentComplete() {
      if (self.items.length === 0) return 0

      return (self.checkedItemsCount / self.items.length) * 100
    },

    get regularItems() {
      return self.items.filter((item) => !item.isImportant)
    },
  }))
  .actions((self) => ({
    addItem(todoItem) {
      self.items.unshift(mstTodoListItem.create({ ...todoItem, index: 0 }))
    },

    deleteItem(todoItem) {
      self.items.remove(todoItem)
    },

    moveItem(fromIndex, toIndex) {
      const newItems = [...self.importantItems, ...move(self.regularItems, fromIndex, toIndex)]

      self.items.replace(newItems)
    },

    reorderItems() {
      const itemIds = self.items.map((item) => item.id)

      put(`/todos/reorder`, { itemIds })
    },

    setItems(items) {
      const itemModels = items.map((item, index) => mstTodoListItem.create({ ...item, index }))

      self.items.replace(itemModels)
    },
  }))

export default mstTodoListStore
