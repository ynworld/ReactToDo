import { IconContext, Square, CheckSquare } from 'phosphor-react'

const TodoItem = (props) => {
  const { text, id, isChecked } = props.todo
  return (
    <article className="todo__list-item">
      <label htmlFor={id} className="todo__list-label">
        {isChecked && <CheckSquare className="list-item__icon" weight="fill" />}
        {!isChecked && <Square className="list-item__icon" />}
        <input type="checkbox" id={id} className="list-item__checkbox" />
        <span className="list-item__text">{text}</span>
      </label>
    </article>
  )
}

export default TodoItem
