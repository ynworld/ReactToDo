import { useRef } from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Tooltip } from '../Tooltip'

const Truncate = ({ children }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  const containerWidth = containerRef.current?.getBoundingClientRect().width
  const contentWidth = contentRef.current?.getBoundingClientRect().width

  const shouldTruncate = contentWidth > containerWidth

  return (
    <Tooltip
      className="overflow-hidden"
      content={shouldTruncate ? children : null}
      width={containerWidth}
    >
      <div ref={containerRef} className="flex whitespace-nowrap">
        <span ref={contentRef} className={classnames({ truncate: shouldTruncate })}>
          {children}
        </span>
      </div>
    </Tooltip>
  )
}

Truncate.propTypes = {
  children: PropTypes.string,
}

export default Truncate
