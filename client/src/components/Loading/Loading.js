import { PropTypes } from 'prop-types'

const Loading = ({ text }) => (
  <div className="text-center text-4xl font-bold text-gray-500">{text}</div>
)

Loading.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Loading
