import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'

import { TodoListStore } from '../../stores/TodoListStore'

import { DragPreview } from '../DragPreview'
import { TodoItem, TodoItemWithDnd } from '../TodoItem'

const TodoList = ({ todoListStore }) => {
  const { newItem, importantItems, regularItems } = todoListStore

  return (
    <ul className="mx-0 my-8 flex flex-col gap-4">
      {newItem && (
        <li>
          <TodoItem todo={newItem} />
        </li>
      )}
      {importantItems.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
      {regularItems.map((todo, index) => (
        <li key={todo.id}>
          <TodoItemWithDnd index={index} todo={todo} />
        </li>
      ))}
      <DragPreview />
    </ul>
  )
}

TodoList.propTypes = {
  todoListStore: PropTypes.instanceOf(TodoListStore).isRequired,
}

export default observer(TodoList)
