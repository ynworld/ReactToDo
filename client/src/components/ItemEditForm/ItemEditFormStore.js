import { flow, types, getEnv } from 'mobx-state-tree'
import { logError } from '../../helpers'

const ItemEditFormStore = types
  .model('ItemEditFormStore', {
    description: '',
    errors: types.map(types.string),
    text: '',
  })
  .volatile(() => ({
    initialValues: {},
    isSubmitting: false,
  }))
  .views((self) => ({
    get canSubmit() {
      return !self.isSubmitting && self.isValid
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
      self.initialValues = { description: self.description, text: self.text }
    },

    setDescription(value) {
      self.description = value
    },

    setText(value) {
      self.text = value
    },

    submit: flow(function* submit() {
      if (!self.canSubmit) throw new Error('ItemEditFormStore | submit | Invalid form')

      try {
        const areFieldsChanged =
          self.payload.text !== self.initialValues.text ||
          self.payload.description !== self.initialValues.description

        if (!areFieldsChanged) return

        self.isSubmitting = true

        yield getEnv(self).onSubmit(self.payload)
      } catch (error) {
        logError(error, 'Submit Error:')
        throw new Error('ItemEditFormStore | submit | Error submitting form')
      } finally {
        self.isSubmitting = false
      }
    }),

    validate() {
      if (!self.isTextValid) {
        self.errors.set('text', 'Title is required, please enter some text')
      } else {
        self.errors.delete('text')
      }
    },
  }))

export default ItemEditFormStore
