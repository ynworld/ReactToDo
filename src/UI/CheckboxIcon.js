import { IconContext, Square, CheckSquare } from 'phosphor-react'

const CheckboxIcon = (props) => {
  const { isChecked } = props

  return (
    <IconContext.Provider
      value={{
        color: '#4fc41d',
        size: 32,
        weight: 'bold',
      }}
    >
      {isChecked && <CheckSquare className="list-item__icon" weight="fill" />}
      {!isChecked && <Square className="list-item__icon" />}
    </IconContext.Provider>
  )
}

export default CheckboxIcon
