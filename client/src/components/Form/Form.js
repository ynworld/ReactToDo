import './Form.css'

const Form = ({ onSubmit, children }) => {
  return (
    <form className="todo__list-form" onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
