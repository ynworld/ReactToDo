import './Button.css'

const Button = (props) => {
  return (
    <button type={props.type} className={`button-${props.style}`}>
      {props.text}
    </button>
  )
}

export default Button
