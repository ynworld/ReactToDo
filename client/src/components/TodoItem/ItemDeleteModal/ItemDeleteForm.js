import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { Spinner } from '../../Spinner'

let todoText = ''

const ItemDeleteForm = ({ closeModal, todo }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteSubmit = async (event) => {
    event.preventDefault()
    setIsDeleting(true)
    await todo.delete()
    setIsDeleting(false)
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
            'relative flex h-8 items-center rounded-md bg-alert/90 px-6 py-2 text-sm text-white shadow-md',
            'transition-all duration-300  hover:bg-alert active:shadow-sm disabled:bg-gray-300 disabled:shadow-md',
          )}
          disabled={isDeleting}
          type="submit"
        >
          <div className="flex justify-center">
            {isDeleting && <Spinner />}
            Delete
          </div>
        </button>
      </div>
    </form>
  )
}

export default ItemDeleteForm

ItemDeleteForm.propTypes = {
  closeModal: PropTypes.func,
  todo: PropTypes.object,
}
