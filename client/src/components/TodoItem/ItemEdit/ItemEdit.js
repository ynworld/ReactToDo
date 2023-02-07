import { iconNames } from '../../../constants'

import { Button, Icon } from '../../../components'

import './ItemEdit.css'

const ItemEdit = ({ todo }) => {
  return (
    <>
      <input
        type="text"
        className="todo__list-input"
        rows="4"
        id="input"
        autoFocus
        value={todo.text}
      />
      <div className="todo__list-icons">
        <Button className="todo__list-button">
          <Icon name={iconNames.check} className="todo__list-icon" />
        </Button>
        <Button className="todo__list-button" onClick={todo.delete}>
          <Icon name={iconNames.xmark} className="todo__list-icon todo__list-icon--red" />
        </Button>
      </div>
    </>
  )
}

export default ItemEdit
