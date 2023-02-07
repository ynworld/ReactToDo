import { observer } from 'mobx-react'

import './TodoItem.css'
import { ItemEdit, ItemView, ItemWrapper } from '../../components'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle, isEditing, canEdit } = todo

  return (
    <ItemWrapper>
      {todo.isEditing ? <ItemEdit todo={todo} /> : <ItemView todo={todo} />}
    </ItemWrapper>
  )
}

export default observer(TodoItem)
