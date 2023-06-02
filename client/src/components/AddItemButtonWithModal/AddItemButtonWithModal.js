import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { observer } from 'mobx-react'
import { TodoListStore } from '../../stores/TodoListStore'

import { Modal, ModalContent } from '../Modal'
import AddItemModal from './AddItemModal'
import AddItemButton from './AddItemButton'

const AddItemButtonWithModal = ({ todoList }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <AddItemButton disabled={todoList.hasItemInEditingMode} onClick={openModal} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <ModalContent>
          <AddItemModal
            isOpen={isOpen}
            onClose={closeModal}
            setIsOpen={setIsOpen}
            todoList={todoList}
          />
        </ModalContent>
      </Modal>
    </>
  )
}

export default observer(AddItemButtonWithModal)

AddItemButtonWithModal.propTypes = {
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}
