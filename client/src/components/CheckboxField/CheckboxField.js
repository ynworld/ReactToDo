import './CheckboxField.css'

const CheckboxField = ({ label, id, isChecked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-4 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="absolute invisible"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <span className="checkbox-custom" />
      <span className="text-base text-gray-800">{label}</span>
    </label>
  )
}

export default CheckboxField
