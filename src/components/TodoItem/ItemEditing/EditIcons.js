import { Button } from '../../'

import { CloseIcon, CheckIcon } from '../../icons'

const ItemEditIcons = ({ handleEditCancel, handleSubmit }) => {
  return (
    <div className="edit__icons">
      <Button shape="round" className="edit__icon-button" onClick={handleSubmit}>
        <CheckIcon className="edit__icon" />
      </Button>
      <Button shape="round" className="edit__icon-button" onClick={handleEditCancel}>
        <CloseIcon className="edit__icon cancel" />
      </Button>
    </div>
  )
}

export default ItemEditIcons
