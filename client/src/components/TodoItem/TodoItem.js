import { observer } from 'mobx-react'
import { iconNames } from '../../constants'
import classnames from 'classnames'

import { CheckboxField, ItemEdit, IconButton } from '../../components'

const TodoItem = ({ todo }) => {
  const { id, text, isChecked, toggle, isEditing, canEdit } = todo

  const handleEditStart = () => {
    todo.startEdit()
  }

  return (
    <article
      className={classnames(
        'flex justify-between items-center gap-3 p-4 rounded-lg min-h-[4rem]',
        'shadow-md bg-gradient-to-br from-white to-gray-50',
      )}
    >
      {isEditing ? (
        <ItemEdit todo={todo} />
      ) : (
        <>
          <CheckboxField id={id} label={text} isChecked={isChecked} onChange={toggle} />
          <div className="flex items-center gap-2">
            <IconButton
              iconName={iconNames.pencil}
              theme="success"
              onClick={handleEditStart}
              disabled={!canEdit}
            />
            <IconButton iconName={iconNames.trash} theme="alert" onClick={todo.delete} />
          </div>
        </>
      )}
    </article>
  )
}

export default observer(TodoItem)
