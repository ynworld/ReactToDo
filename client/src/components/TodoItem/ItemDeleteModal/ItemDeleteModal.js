import { PropTypes } from 'prop-types'
import ItemDeleteForm from './ItemDeleteForm'
import { Modal, ModalContent, ModalHeader } from '../..'

const ItemDeleteModal = ({ isOpen, onClose, todo }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={onClose}>
      <ModalContent>
        <ModalHeader title="Delete Todo" />
        <ItemDeleteForm closeModal={onClose} todo={todo} />
      </ModalContent>
    </Modal>
  )
}

ItemDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  todo: PropTypes.object,
}

export default ItemDeleteModal
