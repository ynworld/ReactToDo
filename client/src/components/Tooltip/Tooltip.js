import { PropTypes } from 'prop-types'
import { TooltipProvider, TooltipTrigger, TooltipContent } from '.'

const Tooltip = ({ children, content, width, className, ...options }) => {
  return (
    <TooltipProvider options={options}>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      <TooltipContent>
        {content ? (
          <div
            className="rounded-md bg-black py-1 px-2 text-xs text-white shadow-md sm:max-w-sm"
            style={{ width: `${width}px` }}
          >
            {content}
          </div>
        ) : null}
      </TooltipContent>
    </TooltipProvider>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.string,
  width: PropTypes.number,
}

export default Tooltip
