import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { ItemEditForm, ModalHeader } from '..'

const AddItemModal = ({ onClose, todoList }) => (
  <>
    <ModalHeader title="Add New Todo" />
    <ItemEditForm onCancel={onClose} onCreate={todoList.createTodo} />
  </>
)

AddItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  todoList: PropTypes.object.isRequired,
}

export default observer(AddItemModal)
