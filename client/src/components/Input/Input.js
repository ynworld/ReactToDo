import './Input.css'

const Input = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="todo__list-input"
      placeholder="I need to..."
      autoFocus
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
