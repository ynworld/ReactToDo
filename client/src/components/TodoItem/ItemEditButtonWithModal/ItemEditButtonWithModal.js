import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { TodoListItem } from '../../../stores/TodoListStore'

import { IconButton, Modal } from '../..'
import { iconNames } from '../../../constants'
import ItemEditModal from './ItemEditModal'
import ModalTrigger from '../../Modal/ModalTrigger'

const ItemEditButtonWithModal = ({ todo, closePopover }) => {
  const { isEditing } = todo

  const toggleEdit = () => {
    if (!isEditing) todo.startEdit()
    else todo.finishEdit()
  }

  return (
    <Modal isOpen={isEditing} setIsOpen={toggleEdit}>
      <ModalTrigger>
        <IconButton
          disabled={!todo.canEdit}
          iconName={iconNames.pencil}
          onClick={toggleEdit}
          theme="success"
        />
      </ModalTrigger>
      <ItemEditModal closePopover={closePopover} onClose={toggleEdit} todo={todo} />
    </Modal>
  )
}

export default observer(ItemEditButtonWithModal)

ItemEditButtonWithModal.propTypes = {
  closePopover: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}
