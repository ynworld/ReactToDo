import './CheckboxField.css'

const CheckboxField = ({ label, id, isChecked, onChange }) => {
  return (
    <label htmlFor={id} className="label">
      <input
        type="checkbox"
        id={id}
        className="checkbox"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <span className="checkbox-custom" />
      <span className="checkbox__label">{label}</span>
    </label>
  )
}

export default CheckboxField
