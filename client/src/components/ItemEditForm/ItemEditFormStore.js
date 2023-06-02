import { flow, types, getEnv, applySnapshot } from 'mobx-state-tree'
import { logError } from '../../helpers'

const ItemEditFormStore = types
  .model('ItemEditFormStore', {
    description: '',
    errors: types.map(types.string),
    text: '',
  })
  .volatile(() => ({
    isSubmitting: false,
  }))
  .views((self) => ({
    get canSubmit() {
      return !self.isSubmitting && self.isValid
    },

    get env() {
      return getEnv(self)
    },

    get isTextValid() {
      return self.text.trim().length > 0
    },

    get isValid() {
      return self.errors.size === 0 && self.isTextValid
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
        return
      }

      applySnapshot(self, { ...todo })
    },

    setText(value) {
      self.text = value
    },

    submit: flow(function* submit() {
      if (!self.canSubmit) throw new Error('ItemEditFormStore | submit | Invalid form')

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
        throw new Error('ItemEditFormStore | submit | Error submitting form')
      } finally {
        self.isSubmitting = false
      }
    }),

    validate(field) {
      if (field === 'text' && !self.isTextValid) {
        self.errors.set('text', 'Title is required, please enter some text')
      } else {
        self.errors.delete('text')
      }
    },
  }))

export default ItemEditFormStore
