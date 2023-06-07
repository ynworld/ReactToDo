import { toast } from 'react-toastify'

const AddToast = ({ text, type }) => {
  if (type === 'success') {
    toast.success(`${text}`)

    return
  }

  if (type === 'error') {
    toast.error(`${text}`)

    return
  }

  toast(`${text}`)
}

export default AddToast
