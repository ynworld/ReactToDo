import { PropTypes } from 'prop-types'
import { useState } from 'react'
import classnames from 'classnames'
import { Modal, ModalContent, Icon } from '..'
import { TodoListStore } from '../../stores/TodoListStore'
import { iconNames } from '../../constants'
import { post } from '../../api'

const AddItemModal = ({ todoList }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleTextInput = (event) => {
    setInputText(event.target.value)
  }

  const handleAddItem = (event) => {
    event.preventDefault()
    post('/todos', { text: inputText }).then((todoItem) => {
      todoList.addItem(todoItem)
      setIsOpen(false)
    })
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <button
        className={classnames(
          'rounded-full bg-primary p-2 shadow-lg shadow-gray-400',
          'hover:bg-primary-dark active:bg-primary-dark active:shadow-md',
          'disabled:bg-gray-400 disabled:shadow-lg disabled:shadow-gray-400',
          'transition-all duration-300',
        )}
        disabled={isOpen}
        onClick={() => {
          setIsOpen(true)
        }}
        type="button"
      >
        <Icon className="h-10 w-10 text-white" name={iconNames.plusCircle} />
      </button>

      <ModalContent className="mx-auto my-24 w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-medium">Add New Todo</h2>
          <button
            className="h-6 w-6 rounded-full p-1 text-gray-800 hover:bg-gray-200 hover:text-black"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <Icon name={iconNames.xmark} />
          </button>
        </div>
        <form className="flex w-full flex-col gap-4" onSubmit={handleAddItem}>
          <input
            className={classnames(
              'h-8 grow rounded-md border-2 border-primary px-2 text-sm',
              'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
            )}
            onChange={handleTextInput}
            placeholder="I need to..."
            type="text"
          />
          <div className="flex justify-end gap-2">
            <button
              className={classnames(
                'flex h-8 items-center rounded-md px-6 py-2 text-sm shadow-md',
                'hover:bg-gray-100 active:shadow-sm',
              )}
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className={classnames(
                'flex h-8 items-center rounded-md bg-primary px-6 py-2 text-sm text-white shadow-md',
                'hover:bg-primary-dark active:shadow-sm',
              )}
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddItemModal

AddItemModal.propTypes = {
  todoList: PropTypes.instanceOf(TodoListStore).isRequired,
}
