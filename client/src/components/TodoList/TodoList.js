import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { TodoItem } from '../TodoItem'

import { TodoListItem } from '../../stores/TodoListStore'

const TodoList = ({ todos }) => (
  <ul className="mx-0 my-8 flex flex-col gap-4">
    {todos.map((todo, index) => (
      <li key={todo.key}>
        <TodoItem index={index} todo={todo} />
      </li>
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.instanceOf(TodoListItem)).isRequired,
}

export default observer(TodoList)
