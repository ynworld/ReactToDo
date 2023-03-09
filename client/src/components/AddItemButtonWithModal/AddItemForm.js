import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { post } from '../../api'

import { TodoListStore } from '../../stores/TodoListStore'

const AddItemForm = ({ onClose, todoList }) => {
  const [inputText, setInputText] = useState('')

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleAddItem = (event) => {
    event.preventDefault()
    if (inputText.trim() === '') return
    post('/todos', { text: inputText }).then((todoItem) => {
      todoList.addItem(todoItem)
      if (onClose) onClose()
    })
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleAddItem}>
      <input
        className={classnames(
          'h-8 grow rounded-md border-2 border-primary px-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
        )}
        onChange={handleTextInput}
        placeholder="I need to..."
        type="text"
      />
      <div className="flex justify-end gap-2">
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
            'hover:bg-primary-dark active:shadow-sm',
          )}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default AddItemForm

AddItemForm.propTypes = {
  onClose: PropTypes.func,
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}
