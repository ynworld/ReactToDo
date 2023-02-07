import { CheckboxField, Button, Icon } from '../../../components'

import { iconNames } from '../../../constants'

const ItemView = ({ todo }) => {
  const { id, text, isChecked, toggle, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
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
  )
}

export default ItemView
