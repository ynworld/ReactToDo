import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { ItemEditForm, Modal, ModalHeader, ModalContent } from '../..'

const ItemEditModal = ({ isOpen, setIsOpen, todo }) => {
  const closeModal = () => setIsOpen(false)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalHeader title="Edit To Do" />
        <ItemEditForm onCancel={closeModal} onUpdate={todo.save} todo={todo} />
      </ModalContent>
    </Modal>
  )
}

ItemEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
}

export default observer(ItemEditModal)
