import { observer } from 'mobx-react'
import classnames from 'classnames'

const Button = ({ className, children, type = 'button', ...restProps }) => {
  return (
    <button
      type={type}
      className={classnames('flex justify-center items-center', className)}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default observer(Button)
