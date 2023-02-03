import { observer } from 'mobx-react'
import './Button.css'
import classnames from 'classnames'

const Button = observer(
  ({ className, children, type = 'button', shape, addItem, ...restProps }) => {
    const clickHandler = () => {
      addItem('New To Do')
    }

    return (
      <button
        type={type}
        className={classnames(`button-${shape}`, className)}
        onClick={clickHandler}
        {...restProps}
      >
        {children}
      </button>
    )
  },
)

export default Button
