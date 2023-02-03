import { observer } from 'mobx-react'

import './NewTodo.css'
import { InputForm } from '../InputForm'

const NewTodo = observer(({ addItem }) => {
  return (
    <article className="input__container">
      <InputForm placeholder="New To Do" addItem={addItem} />
    </article>
  )
})

export default NewTodo
