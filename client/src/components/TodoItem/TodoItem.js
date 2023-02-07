import { observer } from 'mobx-react'

import './TodoItem.css'
import { CheckboxField, Button, ItemEdit, Icon } from '../../components'
import { iconNames } from '../../constants'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle, isEditing, canEdit } = todo

  const handleEditStart = () => {
    todo.setIsEditing(true)
  }

  return (
    <article className="todo__list-item">
      {isEditing ? (
        <ItemEdit todo={todo} />
      ) : (
        <>
          <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
          <div className="todo__list-icons">
            <Button className="todo__list-button" onClick={handleEditStart} disabled={!canEdit}>
              <Icon name={iconNames.pencil} className="todo__list-icon" />
            </Button>
            <Button className="todo__list-button" onClick={todo.delete}>
              <Icon name={iconNames.trash} className="todo__list-icon todo__list-icon--red" />
            </Button>
          </div>
        </>
      )}
    </article>
  )
}

export default observer(TodoItem)
