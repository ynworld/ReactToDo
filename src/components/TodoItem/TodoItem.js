import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField } from '../CheckboxField'

const TodoItem = ({ todo }) => {
  return (
    <article className="todo__list-item">
      <CheckboxField todo={todo} />
    </article>
  )
}

export default observer(TodoItem)
