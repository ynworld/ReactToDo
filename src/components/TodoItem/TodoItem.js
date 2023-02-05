import { observer } from 'mobx-react'
import { useState } from 'react'

import { CheckboxField } from '../CheckboxField'
import { CheckCircleIcon, CloseIcon, EditIcon, TrashIcon } from '../icons'
import { ItemEdit, ItemView } from './index'

import './TodoItem.css'

const TodoItem = ({ todo }) => {
  return (
    <article className="todo__list-item">
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}
    </article>
  )
}

export default observer(TodoItem)
