import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField } from '../CheckboxField'
import { TrashIcon } from '../icons'

const TodoItem = ({ todo }) => {
  const handleItemDelete = () => todo.delete()

  const { id, text, isChecked, toggle } = todo

  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
      <div className="edit__icons" onClick={handleItemDelete}>
        <TrashIcon className="edit__icon" />
      </div>
    </article>
  )
}

export default observer(TodoItem)
