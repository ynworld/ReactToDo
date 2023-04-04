import { flow, types, getEnv } from 'mobx-state-tree'
import { logError } from '../../helpers'

const ItemEditFormStore = types
  .model('ItemEditFormStore', {
    description: types.string,
    isSubmitting: false,
    text: types.string,
  })
  .views((self) => ({
    get canSubmit() {
      return (
        !self.isSubmitting &&
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
      self.isSubmitting = true

      try {
        if (self.env.todo) {
          self.env.todo.update(self.trimmedValues)
          self.isSubmitting = false
        } else {
          yield self.env.onCreate(self.trimmedValues)
          self.isSubmitting = false
        }
      } catch (error) {
        logError(error, 'Submit Error:')
      }
    }),
  }))

export default ItemEditFormStore
