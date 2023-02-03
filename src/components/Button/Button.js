import { observer } from 'mobx-react'
import classnames from 'classnames'

import './Button.css'

const Button = ({ className, children, type = 'button', shape, ...restProps }) => {
  return (
    <button type={type} className={classnames(`button button-${shape}`, className)} {...restProps}>
      {children}
    </button>
  )
}

export default observer(Button)
