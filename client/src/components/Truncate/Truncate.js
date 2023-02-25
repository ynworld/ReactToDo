import { useRef } from 'react'
import { PropTypes } from 'prop-types'

import { Tooltip } from '..'

import { getElementWidth } from '../../helpers/element'

const Truncate = ({ children }) => {
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  const containerWidth = getElementWidth(containerRef.current)
  const contentWidth = getElementWidth(contentRef.current)

  const isTruncated = contentWidth > containerWidth

  return (
    <Tooltip className="overflow-hidden" content={isTruncated ? children : null}>
      <div ref={containerRef} className="truncate">
        <span ref={contentRef}>{children}</span>
      </div>
    </Tooltip>
  )
}

Truncate.propTypes = {
  children: PropTypes.string,
}

export default Truncate
