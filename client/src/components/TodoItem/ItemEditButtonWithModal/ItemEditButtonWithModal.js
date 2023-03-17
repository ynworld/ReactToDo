import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { TodoListItem } from '../../../stores/TodoListStore'

import { IconButton, Modal } from '../..'
import { iconNames } from '../../../constants'
import ItemEditModal from './ItemEditModal'
import ModalTrigger from '../../Modal/ModalTrigger'

const ItemEditButtonWithModal = ({ todo, closePopover }) => {
  const { isEditing, toggleIsEditing } = todo

  return (
    <Modal isOpen={isEditing} setIsOpen={toggleIsEditing}>
      <ModalTrigger>
        <IconButton
          disabled={!todo.canEdit}
          iconName={iconNames.pencil}
          onClick={toggleIsEditing}
          theme="success"
        />
      </ModalTrigger>
      <ItemEditModal closePopover={closePopover} todo={todo} />
    </Modal>
  )
}

export default observer(ItemEditButtonWithModal)

ItemEditButtonWithModal.propTypes = {
  closePopover: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}
