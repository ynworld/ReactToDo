import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField } from '../CheckboxField'

const TodoItem = observer(({ todo }) => {
  const { id, title, isChecked, toggle } = todo

  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={title} isChecked={isChecked} onChange={toggle} />
    </article>
  )
})

export default TodoItem
