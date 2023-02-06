import { observer } from 'mobx-react'
import classnames from 'classnames'

import './Button.css'

const Button = ({ className, children, type = 'button', shape, position, ...restProps }) => {
  return (
    <button type={type} className={classnames('button', shape, position, className)} {...restProps}>
      {children}
    </button>
  )
}

export default observer(Button)
