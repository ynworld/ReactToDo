import { addDisposer, flow, getParentOfType, getSnapshot, types } from 'mobx-state-tree'

import { format } from 'date-fns'
import { del, put } from '../../api'
import TodoListStore from './TodoListStore'
import { logError, onChildAction } from '../../helpers'

const TodoListItem = types
  .model('TodoItem', {
    createdAt: types.Date,
    description: types.string,
    id: types.identifierNumber,
    isChecked: types.boolean,
    isImportant: types.boolean,
    text: types.string,
  })
  .views((self) => ({
    get displayDate() {
      if (!self.createdAt) return null

      return format(self.createdAt, 'P')
    },

    get todoListStore() {
      return getParentOfType(self, TodoListStore)
    },
  }))
  .actions((self) => ({
    afterCreate() {
      addDisposer(self, onChildAction(self, self.save, true, ['delete']))
    },

    delete: flow(function* remove() {
      try {
        yield del(`/todos/${self.id}`)

        self.todoListStore.deleteItem(self)
      } catch (error) {
        logError(error, 'Delete Error:')
      }
    }),

    save: flow(function* save() {
      try {
        yield put(`/todos/${self.id}`, getSnapshot(self))
      } catch (error) {
        logError(error, 'Save Error:')
      }
    }),

    toggle() {
      self.isChecked = !self.isChecked
    },

    toggleIsImportant() {
      self.isImportant = !self.isImportant
    },

    update({ text, description }) {
      self.text = text
      self.description = description
    },
  }))

export default TodoListItem
