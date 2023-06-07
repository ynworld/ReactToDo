import { destroy, flow, types } from 'mobx-state-tree'
import { toast } from 'react-toastify'
import TodoListItem from './TodoListItem'
import { logError, sortByDate } from '../../helpers'
import { move } from '../../helpers/array'
import { post, put } from '../../api'

const TodoListStore = types
  .model('TodoListStore', {
    items: types.array(TodoListItem),
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
    createTodo: flow(function* createTodo(todoText) {
      try {
        const todoItem = yield post('/todos', {
          ...todoText,
        })

        self.items.unshift(todoItem)
        toast.success(`Success! Added: ${todoItem.text}`)
      } catch (error) {
        toast.error(`Failed to add new todo! ${error}`)
        logError(error, 'Create Error:')
      }
    }),

    deleteItem(todoItem) {
      destroy(todoItem)
    },

    moveItem(fromIndex, toIndex) {
      const newItems = [...self.importantItems, ...move(self.regularItems, fromIndex, toIndex)]

      self.items.replace(newItems)
    },

    reorderItems: flow(function* reorderItems() {
      const itemIds = self.items.map((item) => item.id)

      try {
        yield put(`/todos/reorder`, { itemIds })
        toast.success(`Success! Items reordered.`)
      } catch (error) {
        toast.error(`Oops! Failed to reorder. ${error}`)
        logError(error, 'Reorder Error:')
      }
    }),

    setItems(items) {
      self.items.replace(items)
    },
  }))

export default TodoListStore
