import { PropTypes } from 'prop-types'
import { TooltipProvider, TooltipTrigger, TooltipContent } from '.'

const Tooltip = ({ children, content, className, ...options }) => {
  if (!content) return children

  return (
    <TooltipProvider options={options}>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="rounded-md bg-black py-1 px-2 text-xs text-white shadow-md sm:max-w-xs">
          {content}
        </div>
      </TooltipContent>
    </TooltipProvider>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.string,
}

export default Tooltip
