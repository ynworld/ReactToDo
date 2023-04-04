import { flow, types, getEnv } from 'mobx-state-tree'
import { logError } from '../../helpers'

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

    get trimmedValues() {
      return { description: self.trimmedDescription, text: self.trimmedText }
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
        self.env.todo.update(self.trimmedValues)
      } else {
        try {
          yield self.env.onCreate(self.trimmedValues)
        } catch (error) {
          logError(error, 'Add New Item Error:')
        }
      }
    }),
  }))

export default ItemEditFormStore
