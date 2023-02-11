import './CheckboxField.css'

const CheckboxField = ({ label, id, isChecked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="absolute invisible"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <div className="checkbox-custom" />
      <div className="text-sm text-gray-800">{label}</div>
    </label>
  )
}

export default CheckboxField
