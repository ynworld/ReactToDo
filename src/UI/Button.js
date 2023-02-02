import './Button.css'

const Button = (props) => {
  const { type, shape, text } = props

  return (
    <button type={type} className={`button-${shape}`}>
      {text}
    </button>
  )
}

export default Button
