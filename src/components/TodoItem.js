import './TodoItem.css'

import CheckboxIcon from '../UI/CheckboxIcon'

const TodoItem = (props) => {
  const { text, id, isChecked } = props.todo
  return (
    <article className="todo__list-item">
      <label htmlFor={id} className="todo__list-label">
        <CheckboxIcon isChecked={isChecked} />
        <input type="checkbox" id={id} className="list-item__checkbox" />
        <span className="list-item__text">{text}</span>
      </label>
    </article>
  )
}

export default TodoItem
