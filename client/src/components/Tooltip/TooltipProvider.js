import { PropTypes } from 'prop-types'
import { createContext, useContext } from 'react'
import useTooltip from './useTooltip'

const TooltipContext = createContext(null)

export const useTooltipContext = () => {
  const context = useContext(TooltipContext)

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />')
  }

  return context
}

const TooltipProvider = ({ children, options = {} }) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip({ ...options })

  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>
}

TooltipProvider.propTypes = {
  children: PropTypes.node,
  options: PropTypes.object,
}

export default TooltipProvider
