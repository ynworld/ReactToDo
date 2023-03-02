import { PropTypes } from 'prop-types'
import { createContext, useContext } from 'react'

import useModal from './useModal'

const ModalContext = createContext(null)

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (context == null) {
    throw new Error('Modal components must be wrapped in <Modal />')
  }

  return context
}

const Modal = ({ children, ...options }) => {
  const modal = useModal(options)

  return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
}

export default Modal

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}
