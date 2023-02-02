import './Button.css'
import classnames from 'classnames'

const Button = ({ className, children, type = 'button', shape, ...restProps }) => {
  return (
    <button type={type} className={classnames(`button-${shape}`, className)} {...restProps}>
      {children}
    </button>
  )
}

export default Button
