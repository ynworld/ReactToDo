import { observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import { Icon } from '../..'
import { iconNames } from '../../../constants'
import { TodoListItem } from '../../../stores/TodoListStore'
import ItemEditForm from './ItemEditForm'
import { ModalContent } from '../../Modal'

const ItemEditModal = ({ closePopover, onClose, todo }) => (
  <ModalContent className="w-96 rounded-md bg-gradient-to-br from-white to-gray-100 p-4 shadow-md">
    <div className="mb-4 flex justify-between">
      <h2 className="text-xl font-medium">Edit Todo</h2>
      <button
        className="h-6 w-6 rounded-full p-1 text-gray-800 hover:bg-gray-200 hover:text-black"
        onClick={onClose}
        type="button"
      >
        <Icon name={iconNames.xmark} />
      </button>
    </div>
    <ItemEditForm closePopover={closePopover} onClose={onClose} todo={todo} />
  </ModalContent>
)

ItemEditModal.propTypes = {
  closePopover: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  todo: PropTypes.instanceOf(TodoListItem).isRequired,
}

export default observer(ItemEditModal)
