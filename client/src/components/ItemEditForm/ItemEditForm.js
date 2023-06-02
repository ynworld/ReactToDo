import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { TextInput, InputBlock, TextArea, ItemEditFormStore, Spinner } from '..'

const titleMaxLength = 35
const descriptionMaxLength = 250

const ItemEditForm = ({ onCancel, onCreate, onUpdate, todo }) => {
  const [formStore] = useState(() => ItemEditFormStore.create({}, { onCreate, onUpdate, todo }))

  const handleTextInputChange = (event) => {
    const { setText, validate } = formStore

    setText(event.target.value)
    validate('text')
  }

  const handleDescriptionInputChange = (event) => {
    formStore.setDescription(event.target.value)
  }

  const { canSubmit, description, errors, isSubmitting, text } = formStore

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await formStore.submit()

      onCancel()
    } catch (error) {
      console.log(error, 'ItemEditForm | handleSubmit')
    }
  }

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <InputBlock htmlFor="title" title="Title">
        <TextInput
          errorText={errors.get('text')}
          id="title"
          isInvalid={Boolean(errors.get('text'))}
          maxLength={titleMaxLength}
          onChange={handleTextInputChange}
          placeholder="I need to..."
          value={text}
        />
      </InputBlock>
      <InputBlock htmlFor="description" title="Description">
        <TextArea
          id="description"
          isResizable={false}
          maxLength={descriptionMaxLength}
          onChange={handleDescriptionInputChange}
          placeholder="Enter description (optional)"
          rows={6}
          value={description}
        />
      </InputBlock>
      <div className="mt-2 flex grow justify-end gap-2">
        <button
          className={classnames(
            'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
            'hover:bg-gray-100 active:shadow-sm',
          )}
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className={classnames(
            'relative flex h-8 items-center rounded-md bg-primary px-6 py-2 text-sm text-white shadow-md',
            'hover:bg-primary-dark active:shadow-sm disabled:bg-gray-300 disabled:shadow-md',
            'transition-all duration-300',
          )}
          disabled={!canSubmit}
          type="submit"
        >
          <div className="flex justify-center">
            {isSubmitting && <Spinner />}
            {todo ? 'Edit' : 'Add'}
          </div>
        </button>
      </div>
    </form>
  )
}

export default observer(ItemEditForm)

ItemEditForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  todo: PropTypes.object,
}
