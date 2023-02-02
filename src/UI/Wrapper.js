import './Wrapper.css'

const Wrapper = (props) => {
  return (
    <div className="wrapper">
      <h1 className="title">{props.title}</h1>
      {props.children}
    </div>
  )
}

export default Wrapper
