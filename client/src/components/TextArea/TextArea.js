import classnames from 'classnames'
import { PropTypes } from 'prop-types'

const TextArea = ({ value, className, ...textAreaProps }) => {
  return (
    <textarea
      className={classnames(
        className,
        'grow rounded-md border-2 border-primary p-2 text-sm',
        'outline-none transition-all duration-300 focus:shadow-md focus:shadow-primary/25',
      )}
      value={value}
      {...textAreaProps}
    />
  )
}

export default TextArea

TextArea.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}
