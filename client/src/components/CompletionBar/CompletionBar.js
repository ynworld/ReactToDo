import './CompletionBar.css'

const CompletionBar = ({ percentComplete }) => {
  return <div className="completion-bar" style={{ width: `${percentComplete}%` }} />
}

export default CompletionBar
