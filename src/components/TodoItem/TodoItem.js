import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField } from '../CheckboxField'

const TodoItem = ({ todo, deleteItem, passInputValue }) => {
  return (
    <article className="todo__list-item">
      <CheckboxField todo={todo} deleteItem={deleteItem} passInputValue={passInputValue} />
    </article>
  )
}

export default observer(TodoItem)
