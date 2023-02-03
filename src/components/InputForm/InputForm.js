import './InputForm.css'
import { Button } from '..'

const InputForm = ({ placeholder, addItem }) => {
  return (
    <form onSubmit={addItem} className="input__form">
      <input id="input" type="text" placeholder={placeholder} className="input" />
      <Button type="submit" shape="small-rectangle">
        Add
      </Button>
    </form>
  )
}

export default InputForm
