import { observer } from 'mobx-react'

import './TodoItem.css'
import { ItemEdit, ItemView } from '../../components'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle, isEditing, canEdit } = todo

  return (
    <article className="todo__list-item">
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}
    </article>
  )
}

export default observer(TodoItem)
