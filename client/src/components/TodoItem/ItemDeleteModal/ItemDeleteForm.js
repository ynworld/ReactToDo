import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { TodoListItem } from '../../../stores/TodoListStore'

let todoText = ''

const ItemDeleteForm = ({ closeModal, todo }) => {
  const handleDeleteSubmit = (event) => {
    event.preventDefault()
    todo.delete()
    closeModal()
  }

  todoText = todo ? todo.text : todoText

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleDeleteSubmit}>
      <p className="text-sm">{todoText}</p>
      <p className="text-right text-sm font-medium text-alert">Really? This cannot be undone!</p>
      <div className="flex justify-end gap-2">
        <button
          className={classnames(
            'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
            'transition-all duration-300 hover:bg-gray-100 active:shadow-sm',
          )}
          onClick={closeModal}
          type="button"
        >
          Cancel
        </button>
        <button
          className={classnames(
            'flex h-8 items-center rounded-md bg-alert/90 px-6 py-2 text-sm text-white shadow-md',
            'transition-all duration-300  hover:bg-alert active:shadow-sm',
          )}
          type="submit"
        >
          Delete
        </button>
      </div>
    </form>
  )
}

export default ItemDeleteForm

ItemDeleteForm.propTypes = {
  closeModal: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem),
}
