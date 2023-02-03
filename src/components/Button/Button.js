import { observer } from 'mobx-react'
import classnames from 'classnames'

<<<<<<< HEAD
import './Button.css'

const Button = ({ className, children, type = 'button', shape, ...restProps }) => {
  return (
    <button
      type={type}
      className={classnames(`button-${shape}`, className)}
      {...restProps}
    >
      {children}
    </button>
  )
}
=======
const Button = observer(
  ({ className, children, type = 'button', shape, onClick, ...restProps }) => {
    return (
      <button
        type={type}
        className={classnames('button', `button-${shape}`, className)}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </button>
    )
  },
)
>>>>>>> 3887b64 (feat: add new todo form)

export default observer(Button)
