import { PropTypes } from 'prop-types'
import { useState } from 'react'
import { TodoListStore } from '../../stores/TodoListStore'
import TriggerButton from './TriggerButton'

import AddItemModal from './AddItemModal'

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
      <TriggerButton onClick={openModal} />
      <AddItemModal
        isOpen={isOpen}
        onClose={closeModal}
        setIsOpen={setIsOpen}
        todoList={todoList}
      />
    </>
  )
}

export default AddItemButtonWithModal

AddItemButtonWithModal.propTypes = {
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}
