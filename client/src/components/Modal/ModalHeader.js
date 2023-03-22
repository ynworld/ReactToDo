import { PropTypes } from 'prop-types'
import { useModalContext } from './Modal'
import { Icon } from '..'
import { iconNames } from '../../constants'

const ModalHeader = ({ title }) => {
  const { setIsOpen } = useModalContext()

  const closeModal = () => setIsOpen(false)

  return (
    <div className="mb-4 flex justify-between">
      <h2 className="text-xl font-medium">{title}</h2>
      <button
        className="h-6 w-6 rounded-full p-1 text-gray-800 hover:bg-gray-200 hover:text-black"
        onClick={closeModal}
        type="button"
      >
        <Icon name={iconNames.xmark} />
      </button>
    </div>
  )
}

ModalHeader.propTypes = {
  title: PropTypes.string,
}

export default ModalHeader
