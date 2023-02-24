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

  const isTruncated = contentWidth > containerWidth

  return (
    <Tooltip className="truncate" content={isTruncated ? children : null}>
      <div ref={containerRef} className="truncate">
        <span ref={contentRef} className={classnames({ truncate: isTruncated })}>
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
