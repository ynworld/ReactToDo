import classnames from 'classnames'
import { PropTypes } from 'prop-types'

const TextArea = ({ value, className, maxLength, ...textAreaProps }) => {
  return (
    <>
      <textarea
        className={classnames(
          className,
          'grow rounded-md border-2 border-primary p-2 text-sm',
          'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
        )}
        maxLength={maxLength}
        value={value}
        {...textAreaProps}
      />
      {maxLength && (
        <div className="absolute right-1 -bottom-6 text-xs text-gray-500">
          {value.length} / {maxLength}
        </div>
      )}
    </>
  )
}

export default TextArea

TextArea.propTypes = {
  className: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
}
