import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { post } from '../../api'
import { TextInput, InputBlock, TextArea } from '..'

const titleMaxLength = 35
const descriptionMaxLength = 250

const ItemEditForm = ({ onClose, todo, todoList }) => {
  const [inputText, setInputText] = useState(todo?.text || '')
  const [descriptionText, setDescriptionText] = useState(todo?.description || '')

  const handleTextInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleDescriptionInputChange = (event) => {
    setDescriptionText(event.target.value)
  }

  const trimmedText = inputText.trim()
  const trimmedDescription = descriptionText.trim()

  const canSubmit =
    trimmedText !== '' && (trimmedText !== todo?.text || trimmedDescription !== todo?.description)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (todo) {
      todo.setText(trimmedText)
      todo.setDescription(trimmedDescription)
    } else {
      const todoItem = await post('/todos', { description: trimmedDescription, text: trimmedText })

      todoList.addItem(todoItem)
    }

    onClose()
  }

  return (
    <form className="flex w-full flex-col gap-8" onSubmit={handleSubmit}>
      <InputBlock htmlFor="title" title="Title">
        <TextInput
          id="title"
          maxLength={titleMaxLength}
          onChange={handleTextInputChange}
          placeholder="I need to..."
          value={inputText}
        />
      </InputBlock>
      <InputBlock htmlFor="description" title="Description">
        <TextArea
          id="description"
          maxLength={descriptionMaxLength}
          onChange={handleDescriptionInputChange}
          placeholder="Enter description (optional)"
          rows={6}
          value={descriptionText}
        />
      </InputBlock>
      <div className="flex grow justify-end gap-2">
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
            'flex h-8 items-center rounded-md bg-primary px-6 py-2 text-sm text-white shadow-md',
            'hover:bg-primary-dark active:shadow-sm disabled:bg-gray-300 disabled:shadow-md',
            'transition-all duration-300',
          )}
          disabled={!canSubmit}
          type="submit"
        >
          {todo ? 'Edit' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default ItemEditForm

ItemEditForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  todo: PropTypes.object,
  todoList: PropTypes.object,
}
