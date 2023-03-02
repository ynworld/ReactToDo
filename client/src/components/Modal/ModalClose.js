import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'

import { useModalContext } from './Modal'

const ModalClose = forwardRef(function DialogClose({ children, ...props }, ref) {
  const { setOpen } = useModalContext()

  return (
    <button type="button" {...props} ref={ref} onClick={() => setOpen(false)}>
      {children}
    </button>
  )
})

export default ModalClose

ModalClose.propTypes = {
  children: PropTypes.node.isRequired,
}
