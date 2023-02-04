import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField } from '../CheckboxField'

const TodoItem = ({ todo, deleteItem }) => {
  return (
    <article className="todo__list-item">
      <CheckboxField todo={todo} deleteItem={deleteItem} />
    </article>
  )
}

export default observer(TodoItem)
