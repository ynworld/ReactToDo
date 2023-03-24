import { flow, getParentOfType, getSnapshot, onSnapshot, types } from 'mobx-state-tree'

import { format } from 'date-fns'
import { del, put } from '../../api'
import mstTodoListStore from './mstTodoListStore'
import { logError } from '../../helpers'

const mstTodoListItem = types
  .model('TodoItem', {
    createdAt: types.Date,
    id: types.identifierNumber,
    isChecked: false,
    isImportant: false,
    text: types.string,
  })
  .views((self) => ({
    get displayDate() {
      if (!self.createdAt) return null

      return format(self.createdAt, 'P')
    },

    get todoListStore() {
      return getParentOfType(self, mstTodoListStore)
    },
  }))
  .actions((self) => ({
    afterCreate() {
      onSnapshot(self, self.save)
    },

    delete: flow(function* deleteItem() {
      try {
        yield del(`/todos/${self.id}`)

        self.todoListStore.deleteItem(self)
      } catch (error) {
        logError(error)
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
        logError(error)
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
