import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'

import { TodoListItem } from '../../../stores/TodoListStore'

const EditItemForm = ({ todo, closePopover }) => {
  const [inputText, setInputText] = useState(todo.text || '')

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

    const text = inputText.trim()

    if (text.length === 0) return

    todo.setText(text)
    todo.toggleIsEditing()

    if (closePopover) closePopover()
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleEditSubmit}>
      <input
        className={classnames(
          'h-8 grow rounded-md border-2 border-primary px-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
        )}
        onChange={handleTextInput}
        placeholder="I need to..."
        type="text"
        value={inputText}
      />
      <div className="flex justify-end gap-2">
        <button
          className={classnames(
            'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
            'hover:bg-gray-100 active:shadow-sm',
          )}
          onClick={todo.toggleIsEditing}
          type="button"
        >
          Cancel
        </button>
        <button
          className={classnames(
            'flex h-8 items-center rounded-md bg-primary px-6 py-2 text-sm text-white shadow-md',
            'hover:bg-primary-dark active:shadow-sm',
          )}
          type="submit"
        >
          Edit
        </button>
      </div>
    </form>
  )
}

export default EditItemForm

EditItemForm.propTypes = {
  closePopover: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}
