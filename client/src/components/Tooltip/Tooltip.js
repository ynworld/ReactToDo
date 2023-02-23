import { PropTypes } from 'prop-types'
import { TooltipProvider, TooltipTrigger, TooltipContent } from '.'

const Tooltip = ({ children, content, ...options }) => {
  return (
    <TooltipProvider options={options}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="rounded-md bg-black p-1 text-xs text-white shadow-md">{content}</div>
      </TooltipContent>
    </TooltipProvider>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.string,
}

export default Tooltip
