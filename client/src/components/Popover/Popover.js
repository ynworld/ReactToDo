import { PropTypes } from 'prop-types'

import { useContext, createContext } from 'react'

import usePopover from './usePopover'

const PopoverContext = createContext(null)

export const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}

export const Popover = ({ children, modal = false, ...restOptions }) => {
  const popover = usePopover({ modal, ...restOptions })
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}

Popover.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.bool,
}
