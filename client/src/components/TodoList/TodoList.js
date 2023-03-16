import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { useRef } from 'react'
import { Transition } from 'react-transition-group'

import { TodoListStore } from '../../stores/TodoListStore'

import { DragPreview } from '../DragPreview'
import { TodoItem, TodoItemWithDnd } from '../TodoItem'

const TodoList = ({ todoListStore }) => {
  const { newItem, importantItems, regularItems } = todoListStore

  const transitionStyles = {
    entered: { opacity: 1 },
    entering: { opacity: 0 },
    exited: { opacity: 0 },
    exiting: { opacity: 0 },
  }

  const nodeRef = useRef(null)

  return (
    <ul className="mx-0 my-8 flex flex-col gap-4">
      {newItem && (
        <li>
          <TodoItem todo={newItem} />
        </li>
      )}
      {importantItems.map((todo, index) => {
        const duration = 300 + index * 100

        return (
          <Transition key={todo.id} appear in nodeRef={nodeRef} timeout={duration}>
            {(state) => (
              <li
                key={todo.id}
                ref={nodeRef}
                style={{
                  opacity: 0,
                  transition: `opacity ${duration}ms ease-in-out`,
                  ...transitionStyles[state],
                }}
              >
                <TodoItem todo={todo} />
              </li>
            )}
          </Transition>
        )
      })}
      {regularItems.map((todo, index) => {
        const importantCount = todoListStore.importantItems.length
        const duration = 300 + (index + importantCount - 1) * 100

        return (
          <Transition key={todo.id} appear in nodeRef={nodeRef} timeout={duration}>
            {(state) => (
              <li
                key={todo.id}
                ref={nodeRef}
                style={{
                  opacity: 0,
                  transition: `opacity ${duration}ms ease-in-out`,
                  ...transitionStyles[state],
                }}
              >
                <TodoItemWithDnd index={index} todo={todo} />
              </li>
            )}
          </Transition>
        )
      })}
      <DragPreview />
    </ul>
  )
}

TodoList.propTypes = {
  todoListStore: PropTypes.instanceOf(TodoListStore).isRequired,
}

export default observer(TodoList)
