import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'

import { TodoListItem } from '../../stores/TodoListStore'

import { DragPreview } from '../DragPreview'
import { TodoItemWithDnd } from '../TodoItem'

const TodoList = ({ todos }) => (
  <ul className="mx-0 my-8 flex flex-col gap-4">
    {todos.map((todo, index) => (
      <li key={todo.key}>
        <TodoItemWithDnd index={index} todo={todo} />
      </li>
    ))}
    <DragPreview />
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.instanceOf(TodoListItem)).isRequired,
}

export default observer(TodoList)
