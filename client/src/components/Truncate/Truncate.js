import { useRef } from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip'

const Truncate = ({ children }) => {
  const boxRef = useRef(null)
  const textRef = useRef(null)

  const boxWidth = boxRef.current?.clientWidth
  const textWidth = textRef.current?.clientWidth

  const trancate = textWidth > boxWidth

  return (
    <Tooltip>
      <TooltipTrigger>
        <div ref={boxRef} className="flex overflow-hidden">
          <div
            ref={textRef}
            className={classnames(
              'whitespace-nowrap',
              trancate ? 'overflow-hidden text-ellipsis' : null,
            )}
          >
            {children}
          </div>
        </div>
      </TooltipTrigger>
      {trancate ? (
        <TooltipContent>
          <div
            className="rounded-md bg-black p-2 text-sm text-white shadow-md"
            style={{ width: `${boxWidth}px` }}
          >
            {children}
          </div>
        </TooltipContent>
      ) : null}
    </Tooltip>
  )
}

Truncate.propTypes = {
  children: PropTypes.string,
}

export default Truncate
