import { useRef } from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'

import { Tooltip } from '../Tooltip'

import { getElementWidth } from '../../helpers/element'

const Truncate = ({ children }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  const containerWidth = getElementWidth(containerRef.current)
  const contentWidth = getElementWidth(contentRef.current)

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
