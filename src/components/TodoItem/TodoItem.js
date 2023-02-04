import { observer } from 'mobx-react'

import { CheckboxField } from '../CheckboxField'
import { CheckCircleIcon, CloseIcon, EditIcon, TrashIcon } from '../icons'

import './TodoItem.css'

const TodoItem = ({ todo, canEdit, deleteItem }) => {
  let inputValue = ''

  const passInputValue = (text) => {
    inputValue = text
  }

  const handleSubmit = () => {
    let text = ''
    if (inputValue === '') text = todo.text
    else text = inputValue
    if (text.trim().length !== 0) todo.editItem(text)
    else todo.editItem('New To Do')
  }

  const handleEditCancel = () => {
    if (!todo.id) {
      deleteItem(todo)

      return
    }

    todo.setIsEditing(false)
  }

  const handleEditingStart = () => {
    if (!canEdit) return

    todo.setIsEditing(true)
  }

  const handleItemDelete = () => {
    deleteItem(todo)
  }

  return (
    <article className="todo__list-item">
      <CheckboxField todo={todo} deleteItem={deleteItem} passInputValue={passInputValue} />
      <div className="edit__icons">
        {todo.isEditing ? (
          <>
            <span onClick={handleEditCancel}>
              <CloseIcon className="edit__icons-icon" />
            </span>
            <span onClick={handleSubmit}>
              <CheckCircleIcon className="edit__icons-icon" />
            </span>
          </>
        ) : (
          <>
            <span onClick={handleEditingStart}>
              <EditIcon className="edit__icons-icon" />
            </span>
            <span onClick={handleItemDelete}>
              <TrashIcon className="edit__icons-icon" />
            </span>
          </>
        )}
      </div>
    </article>
  )
}

export default observer(TodoItem)
