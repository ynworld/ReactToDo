import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField } from '../CheckboxField'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle } = todo

  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
    </article>
  )
}

export default observer(TodoItem)
