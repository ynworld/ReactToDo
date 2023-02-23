import { useRef } from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Tooltip } from '../Tooltip'

const Truncate = ({ children, className }) => {
  const boxRef = useRef(null)
  const textRef = useRef(null)

  const boxWidth = boxRef.current?.clientWidth
  const textWidth = textRef.current?.clientWidth

  const truncate = textWidth > boxWidth

  return (
    <Tooltip className={className} content={truncate ? children : null} width={boxWidth}>
      <div ref={boxRef} className="flex overflow-hidden">
        <div
          ref={textRef}
          className={classnames(
            'whitespace-nowrap',
            truncate ? 'overflow-hidden text-ellipsis' : null,
          )}
        >
          {children}
        </div>
      </div>
    </Tooltip>
  )
}

Truncate.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
}

export default Truncate
