import { PropTypes } from 'prop-types'
import { forwardRef } from 'react'
import {
  useMergeRefs,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from '@floating-ui/react'

import { useModalContext } from './Modal'

const ModalContent = forwardRef((props, forwardedRef) => {
  const { context, refs, styles, ...modalState } = useModalContext()
  const ref = useMergeRefs([refs.setFloating, forwardedRef])

  return (
    <FloatingPortal id="modal">
      {modalState.isMounted && (
        <FloatingOverlay className="grid place-items-center bg-black/70" lockScroll>
          <FloatingFocusManager context={context} initialFocus={1}>
            <div
              ref={ref}
              style={styles}
              className={props.className}
              {...modalState.getFloatingProps()}
            >
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
