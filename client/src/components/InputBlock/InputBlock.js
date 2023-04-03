import { PropTypes } from 'prop-types'

const InputBlock = ({ children, title, htmlFor }) => (
  <div className="flex flex-col gap-1">
    <label className="flex justify-between text-xs text-gray-500" htmlFor={htmlFor}>
      <span>{title}</span>
    </label>
    {children}
  </div>
)

InputBlock.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default InputBlock
