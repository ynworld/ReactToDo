import { PropTypes } from 'prop-types'

const CompletionBar = ({ percentComplete }) => (
    <div
      className="fixed bottom-0 left-0 h-1 bg-primary transition-all ease-in-out"
      style={{ width: `${percentComplete}%` }}
    />
  )

CompletionBar.propTypes = {
  percentComplete: PropTypes.number.isRequired,
}

export default CompletionBar
