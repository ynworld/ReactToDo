import { PropTypes } from 'prop-types'
import { useModalContext } from './Modal'
import { Icon } from '..'
import { iconNames } from '../../constants'

const ModalHeader = ({ title }) => {
  const { setIsOpen } = useModalContext()

  return (
    <div className="mb-4 flex justify-between">
      <h2 className="text-xl font-medium">{title}</h2>
      <button
        className="h-8 w-8 rounded-full p-1 text-gray-800 hover:bg-gray-200 hover:text-black"
        onClick={() => {
          setIsOpen(false)
        }}
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
