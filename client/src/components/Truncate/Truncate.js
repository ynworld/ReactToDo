import { useEffect, useRef, useState } from 'react'
import { PropTypes } from 'prop-types'

import { Tooltip } from '..'

import { getElementWidth } from '../../helpers/element'

const Truncate = ({ children }) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const containerWidth = getElementWidth(containerRef.current)
    const contentWidth = getElementWidth(contentRef.current)

    setIsTruncated(contentWidth > containerWidth)
  }, [children])

  return (
    <Tooltip className="overflow-hidden" content={isTruncated ? children : null}>
      <div ref={containerRef} className="truncate">
        <span ref={contentRef} className="whitespace-nowrap">
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
