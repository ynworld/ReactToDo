import './TodoItem.css'
import CheckboxField from './CheckboxField'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked } = todo
  return (
    <article className="todo__list-item">
      <CheckboxField id={id} label={text} isChecked={isChecked} onChange={() => {}} />
    </article>
  )
}

export default TodoItem
