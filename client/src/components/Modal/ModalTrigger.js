import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'
import { useMergeRefs } from '@floating-ui/react'

import { useModalContext } from './Modal'

const ModalTrigger = forwardRef(({ children, ...props }, propRef) => {
  const context = useModalContext()
  const childrenRef = children.ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  return (
    <button ref={ref} type="button" {...context.getReferenceProps(props)}>
      {children}
    </button>
  )
})

export default ModalTrigger

ModalTrigger.propTypes = {
  children: PropTypes.node.isRequired,
}
