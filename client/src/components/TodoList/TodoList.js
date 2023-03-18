import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { createRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { TodoListStore } from '../../stores/TodoListStore'

import { DragPreview } from '../DragPreview'
import { TodoItem, TodoItemWithDnd } from '../TodoItem'

const transitionClassNames = {
  appear: 'opacity-0',
  appearActive: 'opacity-100 transition-opacity duration-500',
  enter: 'opacity-0',
  enterActive: 'opacity-100 transition-opacity duration-500',
  exitActive: 'opacity-0 transition-opacity duration-500',
}

const transitionTimeout = 500

const TodoList = ({ todoListStore }) => {
  const { newItem, importantItems, regularItems } = todoListStore

  return (
    <TransitionGroup className="mx-0 my-8 flex flex-col gap-4" component="ul">
      {newItem && (
        <li>
          <TodoItem todo={newItem} />
        </li>
      )}
      {importantItems.map((todo) => {
        const ref = createRef()

        return (
          <CSSTransition
            key={todo.id}
            appear
            classNames={transitionClassNames}
            nodeRef={ref}
            timeout={transitionTimeout}
          >
            <li ref={ref}>
              <TodoItem todo={todo} />
            </li>
          </CSSTransition>
        )
      })}
      {regularItems.map((todo, index) => {
        const ref = createRef()

        return (
          <CSSTransition
            key={todo.id}
            appear
            classNames={transitionClassNames}
            nodeRef={ref}
            timeout={transitionTimeout}
          >
            <li ref={ref}>
              <TodoItemWithDnd index={index} todo={todo} />
            </li>
          </CSSTransition>
        )
      })}
      <DragPreview />
    </TransitionGroup>
  )
}

TodoList.propTypes = {
  todoListStore: PropTypes.instanceOf(TodoListStore).isRequired,
}

export default observer(TodoList)
