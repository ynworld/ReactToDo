import classnames from 'classnames'
import { PropTypes } from 'prop-types'

const TextArea = ({ value, className, maxLength, isResizable = true, ...textAreaProps }) => {
  return (
    <span className="relative inline-flex">
      <textarea
        className={classnames(
          className,
          { 'resize-none': !isResizable },
          'grow rounded-md border-2 border-primary p-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
        )}
        maxLength={maxLength}
        value={value}
        {...textAreaProps}
      />
      {maxLength && (
        <div className="absolute right-1 -bottom-5 text-xs text-gray-500">
          {value.length} / {maxLength}
        </div>
      )}
    </span>
  )
}

export default TextArea

TextArea.propTypes = {
  className: PropTypes.string,
  isResizable: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
}
