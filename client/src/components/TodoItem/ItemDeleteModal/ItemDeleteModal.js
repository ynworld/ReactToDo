import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { TodoListItem } from '../../../stores/TodoListStore'
import ItemDeleteForm from './ItemDeleteForm'
import { Modal, ModalContent, ModalHeader } from '../..'

const ItemDeleteModal = ({ isOpen, setIsOpen, setItemToDelete, todo }) => {
  const closeModal = () => setIsOpen(false)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalHeader title="Delete Todo" />
        <ItemDeleteForm closeModal={closeModal} setItemToDelete={setItemToDelete} todo={todo} />
      </ModalContent>
    </Modal>
  )
}

ItemDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setItemToDelete: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem),
}

export default observer(ItemDeleteModal)
