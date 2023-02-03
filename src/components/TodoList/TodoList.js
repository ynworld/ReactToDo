import { observer } from 'mobx-react'
import { TodoItem } from '../TodoItem'
import './TodoList.css'

const TodoList = observer(({ todos }) => {
  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
})

export default TodoList
