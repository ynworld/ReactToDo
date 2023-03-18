import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { TodoListStore } from '../../stores/TodoListStore'
import AddItemForm from './AddItemForm'
import { ModalContent, ModalHeader } from '../Modal'

const AddItemModal = ({ onClose, todoList }) => (
  <ModalContent>
    <div className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
      <ModalHeader title="Add New Todo" />
      <AddItemForm onClose={onClose} todoList={todoList} />
    </div>
  </ModalContent>
)

AddItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}

export default observer(AddItemModal)
