import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { TodoListItem } from '../../../stores/TodoListStore'
import ItemDeleteForm from './ItemDeleteForm'
import { Modal, ModalContent, ModalHeader } from '../..'

const ItemDeleteModal = ({ isOpen, setIsOpen, todo }) => {
  const closeModal = () => setIsOpen(false)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
        <ModalHeader title="Delete Todo" />
        <ItemDeleteForm closeModal={closeModal} todo={todo} />
      </ModalContent>
    </Modal>
  )
}

ItemDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemDeleteModal)
