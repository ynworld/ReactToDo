import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { Modal, ModalContent, Icon } from '..'
import AddItemForm from './AddItemForm'
import { TodoListStore } from '../../stores/TodoListStore'
import { iconNames } from '../../constants'

const AddItemModal = ({ todoList }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <button
        className={classnames(
          'rounded-full bg-primary p-2 shadow-lg shadow-gray-400',
          'hover:bg-primary-dark active:bg-primary-dark active:shadow-md',
          'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
          'transition-all duration-300',
        )}
        disabled={isOpen}
        onClick={() => {
          setIsOpen(true)
        }}
        type="button"
      >
        <Icon className="h-10 w-10 text-white" name={iconNames.plusCircle} />
      </button>

      <ModalContent className="mx-auto my-24 w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-medium">Add New Todo</h2>
          <button
            className="h-6 w-6 rounded-full p-1 text-gray-800 hover:bg-gray-200 hover:text-black"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <Icon name={iconNames.xmark} />
          </button>
        </div>
        <AddItemForm setIsOpen={setIsOpen} todoList={todoList} />
      </ModalContent>
    </Modal>
  )
}

export default AddItemModal

AddItemModal.propTypes = {
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}
