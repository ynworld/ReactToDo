import { Button } from '../..'

import { EditIcon, TrashIcon } from '../../icons'

const ViewButtons = ({ canEdit, handleEditStart, handleItemDelete }) => {
  return (
    <div className="view__icons">
      <Button shape="" className="view__icon-button" onClick={handleEditStart} disabled={!canEdit}>
        <EditIcon className="view__icon" />
      </Button>
      <Button shape="" className="view__icon-button" onClick={handleItemDelete}>
        <TrashIcon className="view__icon delete" />
      </Button>
    </div>
  )
}

export default ViewButtons
