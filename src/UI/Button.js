import './Button.css'

const Button = ({ type = 'button', shape, text }) => {
  return (
    <button type={type} className={`button-${shape}`}>
      {text}
    </button>
  )
}

export default Button
