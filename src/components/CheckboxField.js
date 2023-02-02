import CheckboxIcon from '../UI/CheckboxIcon'
import './CheckboxField.css'

const CheckboxField = ({ todo }) => {
  const { id, text, isChecked } = todo
  return (
    <label htmlFor={id} className="todo__list-label">
      <CheckboxIcon isChecked={isChecked} />
      <input type="checkbox" id={id} className="list-item__checkbox" />
      <span className="list-item__text">{text}</span>
    </label>
  )
}

export default CheckboxField
