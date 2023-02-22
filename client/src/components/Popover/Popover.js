import { useContext, createContext } from 'react'
import { PropTypes } from 'prop-types'

import usePopover from './usePopover'

const PopoverContext = createContext(null)

export const usePopoverContext = () => {
  const context = useContext(PopoverContext)

  if (context == null) {
    throw new Error('Popover components must be wrapped in <Popover />')
  }

  return context
}

const Popover = ({ children, ...restOptions }) => {
  const popover = usePopover({ ...restOptions })

  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}

Popover.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  modal: PropTypes.bool,
}

export default Popover
