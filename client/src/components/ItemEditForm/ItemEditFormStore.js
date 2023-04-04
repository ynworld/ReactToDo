import { flow, types, getEnv } from 'mobx-state-tree'
import { logError } from '../../helpers'
import { post } from '../../api'

const ItemEditFormStore = types
  .model('ItemEditFormStore', {
    description: types.string,
    text: types.string,
  })
  .views((self) => ({
    get canSubmit() {
      return (
        self.trimmedText !== '' &&
        (self.trimmedText !== self.env.todo?.text ||
          self.trimmedDescription !== self.env.todo?.description)
      )
    },

    get env() {
      return getEnv(self)
    },

    get trimmedDescription() {
      return self.description.trim()
    },

    get trimmedText() {
      return self.text.trim()
    },
  }))
  .actions((self) => ({
    setDescription(value) {
      self.description = value
    },

    setText(value) {
      self.text = value
    },

    submit: flow(function* submit() {
      if (self.env.todo) {
        self.env.todo.setText(self.trimmedText)
        self.env.todo.setDescription(self.trimmedDescription)
      } else {
        try {
          const todoItem = yield post('/todos', {
            description: self.trimmedDescription,
            text: self.trimmedText,
          })

          self.env.todoList.addItem(todoItem)
        } catch (error) {
          logError(error, 'Add New Item Error:')
        }
      }
    }),
  }))

export default ItemEditFormStore
