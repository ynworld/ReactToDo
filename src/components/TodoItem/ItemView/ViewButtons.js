import { Button } from '../..'
import { observer } from 'mobx-react'

import { EditIcon, TrashIcon } from '../../icons'

const ViewButtons = ({ todo: { canEdit }, handleEditStart, handleItemDelete }) => {
  return (
    <div className="view__icons">
      <Button className="view__icon-button" onClick={handleEditStart} disabled={!canEdit}>
        <EditIcon className="view__icon" />
      </Button>
      <Button className="view__icon-button" onClick={handleItemDelete}>
        <TrashIcon className="view__icon delete" />
      </Button>
    </div>
  )
}

export default observer(ViewButtons)
