import { observer } from 'mobx-react'
import { TodoItem } from '../TodoItem'

const TodoList = ({ todos }) => {
  return (
    <ul className="flex flex-col gap-4 mx-0 my-8">
      {todos.map((todo) => (
        <li key={todo.key}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
