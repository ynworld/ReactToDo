import { PropTypes } from 'prop-types'
import { TooltipProvider, TooltipTrigger, TooltipContent } from '.'

const Tooltip = ({ children, content, className, ...options }) =>
  content ? (
    <TooltipProvider options={options}>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      <TooltipContent>
        <div className="rounded-md bg-black py-1 px-2 text-xs text-white shadow-md sm:max-w-sm">
          {content}
        </div>
      </TooltipContent>
    </TooltipProvider>
  ) : (
    children
  )

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.string,
}

export default Tooltip
