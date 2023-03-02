import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'

import { useModalContext } from './Modal'

const ModalClose = forwardRef(({ children, ...props }, ref) => {
  const { setIsOpen } = useModalContext()

  return (
    <button type="button" {...props} ref={ref} onClick={() => setIsOpen(false)}>
      {children}
    </button>
  )
})

export default ModalClose

ModalClose.propTypes = {
  children: PropTypes.node.isRequired,
}
