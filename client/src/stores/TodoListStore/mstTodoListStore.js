import { flow, types } from 'mobx-state-tree'
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
      self.items.unshift(mstTodoListItem.create({ ...todoItem }))
    },

    deleteItem(todoItem) {
      self.items.remove(todoItem)
    },

    moveItem(fromIndex, toIndex) {
      const newItems = [...self.importantItems, ...move(self.regularItems, fromIndex, toIndex)]

      self.items.replace(newItems)
    },

    reorderItems: flow(function* reorderItems() {
      const itemIds = self.items.map((item) => item.id)

      try {
        yield put(`/todos/reorder`, { itemIds })
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }),

    setItems(items) {
      const itemModels = items.map((item) => mstTodoListItem.create({ ...item }))

      self.items.replace(itemModels)
    },
  }))
  .volatile(() => ({
    undoArray: [],
  }))

export default mstTodoListStore
