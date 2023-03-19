import { PropTypes } from 'prop-types'
import { observer } from 'mobx-react'
import { createRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { TodoListStore } from '../../stores/TodoListStore'

import { ItemDeleteModal, DragPreview } from '..'
import { TodoItem, TodoItemWithDnd } from '../TodoItem'

import { useBoolean } from '../../hooks'

const transitionClassNames = {
  appear: 'opacity-0',
  appearActive: 'opacity-100 transition-opacity duration-500',
  enter: 'opacity-0',
  enterActive: 'opacity-100 transition-opacity duration-500',
  exitActive: 'opacity-0 transition-opacity duration-500',
}

const transitionTimeout = 500

const TodoList = ({ todoListStore }) => {
  const { items, newItem, importantItems, regularItems } = todoListStore

  const [itemToDelete, setItemToDelete] = useState(null)

  const [isDeleteModalOpen, { setValue: setIsDeleteModalOpen }] = useBoolean(false)

  const handleDelete = (id) => {
    setItemToDelete(items.find((item) => item.id === id))
    setIsDeleteModalOpen(true)
  }

  return (
    <>
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
                <TodoItem handleDelete={handleDelete} todo={todo} />
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
                <TodoItemWithDnd handleDelete={handleDelete} index={index} todo={todo} />
              </li>
            </CSSTransition>
          )
        })}
        <DragPreview />
      </TransitionGroup>
      <ItemDeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        setItemToDelete={setItemToDelete}
        todo={itemToDelete}
      />
    </>
  )
}

TodoList.propTypes = {
  todoListStore: PropTypes.instanceOf(TodoListStore).isRequired,
}

export default observer(TodoList)
