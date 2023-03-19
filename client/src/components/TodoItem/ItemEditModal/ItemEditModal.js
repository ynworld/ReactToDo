import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { TodoListItem } from '../../../stores/TodoListStore'
import ItemEditForm from './ItemEditForm'
import { Modal, ModalHeader, ModalContent } from '../..'

const ItemEditModal = ({ isOpen, setIsOpen, todo }) => {
  const closeModal = () => setIsOpen(false)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalHeader title="Edit To Do" />
        <ItemEditForm closeModal={closeModal} todo={todo} />
      </ModalContent>
    </Modal>
  )
}

ItemEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemEditModal)
