import { observer } from 'mobx-react'

import { TodoItem } from '../TodoItem'
import './TodoList.css'

import { TrashIcon, EditIcon } from '../icons'

const TodoList = ({ todoList }) => {
  const { items: todos, deleteItem } = todoList
  return (
    <ul className="todo__list">
      {todos.map((todo) => (
        <li key={todo.id} className="list-item">
          <TodoItem todo={todo} deleteItem={deleteItem} />
          <div className="edit__icons">
            <span onClick={todo.setIsEditing.bind(null, true)}>
              <EditIcon className="edit__icons-icon" />
            </span>
            <span onClick={deleteItem.bind(null, todo.id)}>
              <TrashIcon className="edit__icons-icon" />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
