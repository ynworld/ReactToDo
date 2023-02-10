import classnames from 'classnames'

const CheckboxField = ({ label, id, isChecked, onChange }) => {
  return (
    <label htmlFor={id} className="group min-h-[3.2rem] flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="peer absolute invisible"
        defaultChecked={isChecked}
        onChange={onChange}
      />
      <span
        className={classnames(
          'checkbox-custom',
          'relative flex-shrink-0 h-10 w-10',
          'bg-transparent rounded-lg',
          'border-2 border-solid border-primary',
          'cursor-pointer transition-all duration-500 ease-out',
          'group-hover:bg-primary-light',

          'after:absolute after:left-2 after:top-2 after:h-0 after:w-0',
          'after:rounded-xl after:border-solid',
          'after:border-white after:border-r-2 after:border-b-2',
          'after:rotate-0 after:scale-0 after:transition-all after:duration-300 after:ease-out after:opacity-0',

          'peer-checked:bg-primary',
          'peer-checked:after:rotate-45 peer-checked:after:scale-100 peer-checked:after:left-3.5 peer-checked:after:top-2 peer-checked:after:w-2 peer-checked:after:h-4 peer-checked:after:opacity-100',

          'peer-checked:before:animate-ripple',

          'group-hover:peer-checked:bg-primary-light',

          'before:absolute before:left-1 before:right-1',
          'before:w-0 before:h-0 before:rounded-xl',
          'before:border-solid before:border-2',
          'before:border-primary before:scale-0',

          '',
        )}
      />
      <span className="p-1 text-2xl text-gray-800">{label}</span>
    </label>
  )
}

export default CheckboxField
