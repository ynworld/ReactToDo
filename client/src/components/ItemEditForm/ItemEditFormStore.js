import { flow, types, getEnv, applySnapshot } from 'mobx-state-tree'
import { logError } from '../../helpers'

const ItemEditFormStore = types
  .model('ItemEditFormStore', {
    description: '',
    text: '',
  })
  .volatile(() => ({
    isSubmitting: false,
  }))
  .views((self) => ({
    get canSubmit() {
      const { todo } = self.env

      const areFieldsChanged =
        self.payload.text !== todo?.text || self.payload.description !== todo?.description

      const isTextEmpty = self.text.trim() === ''

      return !self.isSubmitting && !isTextEmpty && areFieldsChanged
    },

    get env() {
      return getEnv(self)
    },

    get payload() {
      return { description: self.description.trim(), text: self.text.trim() }
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.setInitialData()
    },

    setDescription(value) {
      self.description = value
    },

    setInitialData() {
      const { todo } = self.env

      if (!todo) return

      applySnapshot(self, { ...todo })
    },

    setText(value) {
      self.text = value
    },

    submit: flow(function* submit() {
      try {
        self.isSubmitting = true

        const handleSubmit = self.env.todo ? self.env.onUpdate : self.env.onCreate

        yield handleSubmit(self.payload)
      } catch (error) {
        logError(error, 'Submit Error:')
      } finally {
        self.isSubmitting = false
      }
    }),
  }))

export default ItemEditFormStore
