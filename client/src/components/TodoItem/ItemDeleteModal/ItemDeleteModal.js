import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { TodoListItem } from '../../../stores/TodoListStore'
import ItemDeleteForm from './ItemDeleteForm'
import { Modal, ModalContent, ModalHeader } from '../..'

const ItemEditModal = ({ todo }) => {
  const { isDeleting, toggleIsDeleting } = todo

  return (
    <Modal isOpen={isDeleting} setIsOpen={toggleIsDeleting}>
      <ModalContent className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
        <ModalHeader title="Delete Todo" />
        <ItemDeleteForm todo={todo} />
      </ModalContent>
    </Modal>
  )
}

ItemEditModal.propTypes = {
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemEditModal)
