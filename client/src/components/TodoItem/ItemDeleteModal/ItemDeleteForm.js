import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { TodoListItem } from '../../../stores/TodoListStore'

const ItemDeleteForm = ({ closeModal, setItemToDelete, todo }) => {
  const handleDeleteSubmit = (event) => {
    event.preventDefault()
    todo.delete()
    closeModal()
    setItemToDelete(null)
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleDeleteSubmit}>
      {todo ? (
        <p className={classnames('text-sm transition-all')}>{todo.text}</p>
      ) : (
        <p className={classnames('text-sm font-medium text-alert transition-all')}>Todo Deleted!</p>
      )}
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
  setItemToDelete: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem),
}
