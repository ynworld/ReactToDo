import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { ItemEditForm, ModalContent, ModalHeader } from '..'

const AddItemModal = ({ onClose, todoList }) => (
  <ModalContent>
    <ModalHeader title="Add New Todo" />
    <ItemEditForm onClose={onClose} todoList={todoList} />
  </ModalContent>
)

AddItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  todoList: PropTypes.object.isRequired,
}

export default observer(AddItemModal)
