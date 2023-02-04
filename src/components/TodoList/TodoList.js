import { observer } from 'mobx-react'

import { TodoItem } from '../TodoItem'
import './TodoList.css'

const TodoList = ({ todoList }) => {
  const { hasItemInEditingMode, items: todos, deleteItem } = todoList

  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.key} className="list-item">
          <TodoItem
            todo={todo}
            deleteItem={deleteItem}
            canEdit={!hasItemInEditingMode}
          />
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
