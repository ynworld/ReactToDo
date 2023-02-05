import { observer } from 'mobx-react'
import { useState } from 'react'

import { CheckboxField } from '../CheckboxField'
import { CheckCircleIcon, CloseIcon, EditIcon, TrashIcon } from '../icons'
import { ItemEdit } from './ItemEditing'

import './TodoItem.css'

const TodoItem = ({ todo }) => {
  const handleEditStart = () => {
    if (!todo.canEdit) return

    todo.startEdit()
  }

  const handleItemDelete = () => {
    todo.delete()
  }

  return (
    <article className="todo__list-item">
      {todo.isEditing ? (
        <ItemEdit todo={todo} />
      ) : (
        <CheckboxField
          id={todo.id}
          label={todo.text}
          onChange={todo.toggle}
          isChecked={todo.isChecked}
        />
      )}
      <div className="edit__icons">
        {todo.isEditing ? (
          <></>
        ) : (
          <>
            <span onClick={handleEditStart}>
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
