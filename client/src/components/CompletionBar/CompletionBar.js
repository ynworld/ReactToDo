const CompletionBar = ({ percentComplete }) => {
  return (
    <div
      className="fixed bottom-0 left-0 h-1 bg-primary transition-all ease-in-out"
      style={{ width: `${percentComplete}%` }}
    />
  )
}

export default CompletionBar
