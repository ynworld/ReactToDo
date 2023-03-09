import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { Icon } from '../Icon'
import { iconNames } from '../../constants'
import { TodoListStore } from '../../stores/TodoListStore'
import AddItemForm from './AddItemForm'
import { ModalContent } from '../Modal'

const AddItemModal = ({ onClose, todoList }) => (
  <ModalContent>
    <div className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-medium">Add New Todo</h2>
        <button
          className="h-6 w-6 rounded-full p-1 text-gray-800 hover:bg-gray-200 hover:text-black"
          onClick={onClose}
          type="button"
        >
          <Icon name={iconNames.xmark} />
        </button>
      </div>
      <AddItemForm onClose={onClose} todoList={todoList} />
    </div>
  </ModalContent>
)

AddItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}

export default observer(AddItemModal)
