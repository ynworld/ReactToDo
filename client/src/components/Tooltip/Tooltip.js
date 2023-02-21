import { PropTypes } from 'prop-types'
import { createContext, useContext } from 'react'
import { useTooltip } from './index'

const TooltipContext = createContext(null)

export const useTooltipContext = () => {
  const context = useContext(TooltipContext)

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />')
  }

  return context
}

const Tooltip = ({ children, ...options }) => {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options)

  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>
}

Tooltip.propTypes = {
  children: PropTypes.node,
}

export default Tooltip
