import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { TodoListItem } from '../../../stores/TodoListStore'
import ItemEditForm from './ItemEditForm'
import { ModalContent } from '../../Modal'
import ModalHeader from '../../Modal/ModalHeader'

const ItemEditModal = ({ closePopover, onClose, todo }) => (
  <ModalContent className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
    <ModalHeader title="Edit To Do" />
    <ItemEditForm closePopover={closePopover} onClose={onClose} todo={todo} />
  </ModalContent>
)

ItemEditModal.propTypes = {
  closePopover: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemEditModal)
