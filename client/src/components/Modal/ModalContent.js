import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'
import {
  useMergeRefs,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react'

import { useModalContext } from './Modal'

const ModalContent = forwardRef((props, propRef) => {
  const { context: floatingContext, ...context } = useModalContext()
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  const { styles } = context

  return (
    <FloatingPortal id="modal">
      {context.isMounted && (
        <FloatingOverlay className=" bg-black/80" lockScroll>
          <FloatingFocusManager context={floatingContext} initialFocus={1}>
            <div ref={ref} {...context.getFloatingProps(props)} style={styles}>
              {props.children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
})

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ModalContent
