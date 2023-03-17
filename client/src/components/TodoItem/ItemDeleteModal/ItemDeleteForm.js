import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { TodoListItem } from '../../../stores/TodoListStore'

const EditItemForm = ({ todo }) => {
  const handleDeleteSubmit = (event) => {
    event.preventDefault()
    todo.delete()
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleDeleteSubmit}>
      <p className={classnames('text-sm')}>{todo.text}</p>
      <p className="font-medium text-sm text-right">Really? This cannot be undone!</p>
      <div className="flex justify-end gap-2">
        <button
          className={classnames(
            'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
            'hover:bg-gray-100 active:shadow-sm',
          )}
          onClick={todo.toggleIsDeleting}
          type="button"
        >
          Cancel
        </button>
        <button
          className={classnames(
            'flex h-8 items-center rounded-md bg-alert px-6 py-2 text-sm text-white shadow-md',
            'hover:bg-alert active:shadow-sm',
          )}
          type="submit"
        >
          Delete
        </button>
      </div>
    </form>
  )
}

export default EditItemForm

EditItemForm.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}
