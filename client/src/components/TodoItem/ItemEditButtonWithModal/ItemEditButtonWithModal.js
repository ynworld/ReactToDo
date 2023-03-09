import { PropTypes } from 'prop-types'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { TodoListItem } from '../../../stores/TodoListStore'

import { IconButton, Modal } from '../..'
import { iconNames } from '../../../constants'
import ItemEditModal from './ItemEditModal'
import ModalTrigger from '../../Modal/ModalTrigger'

const ItemEditButtonWithModal = ({ todo, closePopover }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) todo.finishEdit()
  }, [isOpen, todo])

  const openModal = () => {
    setIsOpen(true)
    todo.startEdit()
  }

  const closeModal = () => {
    setIsOpen(false)
    todo.finishEdit()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalTrigger>
        <IconButton
          disabled={!todo.canEdit}
          iconName={iconNames.pencil}
          onClick={openModal}
          theme="success"
        />
      </ModalTrigger>
      <ItemEditModal
        closePopover={closePopover}
        isOpen={isOpen}
        onClose={closeModal}
        setIsOpen={setIsOpen}
        todo={todo}
      />
    </Modal>
  )
}

export default observer(ItemEditButtonWithModal)

ItemEditButtonWithModal.propTypes = {
  closePopover: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}
