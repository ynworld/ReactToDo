import { PropTypes } from 'prop-types'
import { isMobile } from 'react-device-detect'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import { ItemView, Icon, ItemEditModal } from '..'

import { iconNames } from '../../constants'
import { useBoolean } from '../../hooks'

const TodoItem = ({ onDelete, todo, dndProps = {} }) => {
  const { drag, canDrag, isDragging, itemToMoveRef } = dndProps

  const { isImportant } = todo

  const [isEditModalOpen, { setValue: setIsEditModalOpen, setTrue: openEditModal }] =
    useBoolean(false)

  return (
    <>
      <article
        ref={canDrag ? itemToMoveRef : null}
        className={classnames(
          'group relative flex min-h-[4rem] flex-auto items-center justify-between gap-3 rounded-lg p-4',
          'border-l-4 bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-500',
          isDragging ? 'opacity-0' : 'opacity-100',
          isImportant ? 'border-alert' : 'border-transparent',
        )}
      >
        <ItemView onDelete={onDelete} openEditModal={openEditModal} todo={todo} />
        <div
          ref={drag}
          className={classnames(
            'absolute top-0 right-0 h-8 w-8 flex-none p-2 text-gray-500 hover:bg-black/[0.03]',
            'rounded-md transition-all duration-300 hover:text-black',
            canDrag ? 'group-hover:opacity-100' : '',
            isMobile && !isImportant ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Icon name={iconNames.chevronUpDown} />
        </div>
      </article>
      <ItemEditModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} todo={todo} />
    </>
  )
}

TodoItem.propTypes = {
  dndProps: PropTypes.object,
  onDelete: PropTypes.func,
  todo: PropTypes.object.isRequired,
}

export default observer(TodoItem)
