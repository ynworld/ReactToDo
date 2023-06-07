import { flow, getParentOfType, getSnapshot, applySnapshot, types } from 'mobx-state-tree'

import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { del, put } from '../../api'
import TodoListStore from './TodoListStore'
import { logError } from '../../helpers'

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
    delete: flow(function* remove() {
      try {
        yield del(`/todos/${self.id}`)
        const deletedText = self.text

        self.todoListStore.deleteItem(self)

        toast(`Success! Deleted: ${deletedText}`)
      } catch (error) {
        toast(`Oops! Failed to delete ${self.text}. ${error}`)
        logError(error, 'Delete Error:')
      }
    }),

    save: flow(function* save(payload) {
      try {
        const updatedTodo = yield put(`/todos/${self.id}`, {
          ...getSnapshot(self),
          ...payload,
        })

        applySnapshot(self, updatedTodo)

        toast(`Success! ${self.text} updated.`)
      } catch (error) {
        toast(`Oops! Failed to update  ${self.text}. ${error}`)
        logError(error, 'Save Error:')
      }
    }),

    toggle() {
      self.save({ isChecked: !self.isChecked })
    },

    toggleIsImportant() {
      self.save({ isImportant: !self.isImportant })
    },
  }))

export default TodoListItem
