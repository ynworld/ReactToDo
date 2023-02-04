import { observer } from 'mobx-react'

import { TodoItem } from '../TodoItem'
import './TodoList.css'

const TodoList = ({ todoList }) => {
  const { hasItemInEditingMode, items: todos } = todoList

  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.key} className="list-item">
          <TodoItem todo={todo} canEdit={!hasItemInEditingMode} />
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
