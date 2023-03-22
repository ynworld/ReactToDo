import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { post } from '../../api'

import { TodoListStore, TodoListItem } from '../../stores/TodoListStore'

const ItemEditForm = ({ onClose, todo, todoList }) => {
  const [inputText, setInputText] = useState(todo?.text || '')

  const handleTextInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedText = inputText.trim()

    if (trimmedText === '') return

    if (todo) {
      todo.setText(trimmedText)
    } else {
      const todoItem = await post('/todos', { text: trimmedText })

      todoList.addItem(todoItem)
    }

    onClose()
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className={classnames(
          'h-8 grow rounded-md border-2 border-primary px-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
        )}
        onChange={handleTextInputChange}
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
          {todo ? 'Edit' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default ItemEditForm

ItemEditForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem),
  todoList: PropTypes.instanceOf(TodoListStore),
}
