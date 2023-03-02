import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import { Modal, ModalContent, ModalTrigger, ModalClose, Icon } from '..'
import { TodoListStore } from '../../stores/TodoListStore'
import { iconNames } from '../../constants'

const AddItemModal = ({ todoList }) => {
  return (
    <Modal>
      <ModalTrigger>
        <div
          className={classnames(
            'rounded-full bg-primary p-2 shadow-lg shadow-gray-400',
            'hover:bg-primary-dark active:bg-primary-dark active:shadow-md',
            'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
            'transition-all duration-300',
          )}
          disabled={todoList.hasItemInEditingMode}
        >
          <Icon className="h-10 w-10 text-white" name={iconNames.plusCircle} />
        </div>
      </ModalTrigger>
      <ModalContent className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-medium">Add New Todo</h2>
          <ModalClose className="rounded-full p-1 hover:bg-gray-200 hover:text-black">
            <div className="h-6 w-6 text-gray-800">
              <Icon name={iconNames.xmark} />
            </div>
          </ModalClose>
        </div>
        <form className="flex w-full flex-col gap-4">
          <input
            className={classnames(
              'h-8 grow rounded-md border-2 border-primary px-2 text-sm',
              'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
            )}
            placeholder="I need to..."
            type="text"
          />
          <div className="flex justify-end gap-2">
            <ModalClose>
              <div
                className={classnames(
                  'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
                  'hover:bg-gray-100 active:shadow-sm',
                )}
                type="button"
              >
                Cancel
              </div>
            </ModalClose>
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
      </ModalContent>
    </Modal>
  )
}

export default AddItemModal

AddItemModal.propTypes = {
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}
