import { PropTypes } from 'prop-types'

const InputBlock = ({ children, title, limitProps: { count, maxCount }, htmlFor }) => (
  <div className="flex flex-col gap-1">
    <label className="flex justify-between text-xs text-gray-500" htmlFor={htmlFor}>
      <span>{title}</span>
      <span>
        {count} / {maxCount}
      </span>
    </label>
    {children}
  </div>
)

InputBlock.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  limitProps: PropTypes.object,
  titleMaxLength: PropTypes.number,
}

export default InputBlock
