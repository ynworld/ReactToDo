import { flow, getParent, getSnapshot, onSnapshot, types } from 'mobx-state-tree'

import { format, parseISO } from 'date-fns'
import { del, put } from '../../api'

const mstTodoListItem = types
  .model('TodoItem', {
    createdAt: types.maybe(types.string),
    id: types.maybe(types.integer),
    index: types.maybe(types.integer),
    isChecked: types.optional(types.boolean, false),
    isImportant: types.optional(types.boolean, false),
    text: types.optional(types.string, ''),
  })
  .views((self) => ({
    get displayDate() {
      if (!self.createdAt) return null

      return format(parseISO(self.createdAt), 'P')
    },

    get todoListStore() {
      return getParent(self, 2)
    },
  }))
  .actions((self) => ({
    afterCreate() {
      onSnapshot(self, self.save)
    },

    delete: flow(function* deleteItem() {
      try {
        yield del(`/todos/${self.id}`).then(() => {
          self.todoListStore.deleteItem(self)
        })
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }),

    save: flow(function* save() {
      try {
        const updatedItem = yield put(`/todos/${self.id}`, getSnapshot(self))
        const { id, text, isChecked, isImportant, createdAt } = updatedItem

        self.id = id
        self.text = text
        self.isChecked = isChecked
        self.isImportant = isImportant
        self.createdAt = createdAt
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    }),

    setText(value) {
      self.text = value
    },

    toggle() {
      self.isChecked = !self.isChecked
    },

    toggleIsImportant() {
      self.isImportant = !self.isImportant
    },
  }))

export default mstTodoListItem
