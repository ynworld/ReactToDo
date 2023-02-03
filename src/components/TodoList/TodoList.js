import { observer } from 'mobx-react'

import { TodoItem } from '../TodoItem'
import './TodoList.css'

import { TrashIcon, EditIcon } from '../icons'

const TodoList = ({ todos }) => {
  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.id} className="list-item">
          <TodoItem todo={todo} />
          <div className="edit__icons">
            <EditIcon />
            <TrashIcon />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
