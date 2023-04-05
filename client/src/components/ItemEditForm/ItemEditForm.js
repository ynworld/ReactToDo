import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { TextInput, InputBlock, TextArea, ItemEditFormStore, Spinner } from '..'

const titleMaxLength = 35
const descriptionMaxLength = 250

const ItemEditForm = ({ onClose, todo, todoList }) => {
  const [formStore] = useState(
    ItemEditFormStore.create(
      {
        description: todo?.description || '',
        text: todo?.text || '',
      },
      { onCreate: todoList?.createTodo, onUpdate: todo?.save },
    ),
  )

  const canSubmit =
    formStore.canSubmit &&
    (formStore.trimmedText !== todo?.text || formStore.trimmedDescription !== todo?.description)

  const handleTextInputChange = (event) => {
    formStore.setText(event.target.value)
  }

  const handleDescriptionInputChange = (event) => {
    formStore.setDescription(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await formStore.submit()

    if (!formStore.isSubmitting) onClose()
  }

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <InputBlock htmlFor="title" title="Title">
        <TextInput
          id="title"
          maxLength={titleMaxLength}
          onChange={handleTextInputChange}
          placeholder="I need to..."
          value={formStore.text}
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
          value={formStore.description}
        />
      </InputBlock>
      <div className="mt-2 flex grow justify-end gap-2">
        <button
          className={classnames(
            'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
            'hover:bg-gray-100 active:shadow-sm',
          )}
          onClick={onClose}
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
            {formStore.isSubmitting && <Spinner />}
            {todo ? 'Edit' : 'Add'}
          </div>
        </button>
      </div>
    </form>
  )
}

export default observer(ItemEditForm)

ItemEditForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  todo: PropTypes.object,
  todoList: PropTypes.object,
}
