import { flow, types, getEnv, applySnapshot } from 'mobx-state-tree'
import { logError } from '../../helpers'

const ItemEditFormStore = types
  .model('ItemEditFormStore', {
    description: '',
    isNew: false,
    text: '',
  })
  .volatile(() => ({
    isSubmitting: false,
  }))
  .views((self) => ({
    get canSubmit() {
      return !self.isSubmitting && !(self.text.trim() === '')
    },

    get env() {
      return getEnv(self)
    },

    get isInvalid() {
      return self.text.trim() === '' && !self.isNew
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

      if (!todo) {
        self.isNew = true

        return
      }

      self.isNew = false

      applySnapshot(self, { ...todo })
    },

    setText(value) {
      if (self.isNew) self.isNew = false
      self.text = value
    },

    submit: flow(function* submit() {
      try {
        const { todo } = self.env
        const areFieldsChanged =
          self.payload.text !== todo?.text || self.payload.description !== todo?.description

        if (!areFieldsChanged) return

        self.isSubmitting = true

        const handleSubmit = self.env.todo ? self.env.onUpdate : self.env.onCreate

        yield handleSubmit(self.payload)
      } catch (error) {
        logError(error, 'Submit Error:')
      }
    }),
  }))

export default ItemEditFormStore
