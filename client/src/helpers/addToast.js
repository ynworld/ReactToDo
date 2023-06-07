import { toast } from 'react-toastify'
import { toastTypes } from '../constants/toasts'

const addToast = ({ text, type = 'success' }) => {
  switch (type) {
    case toastTypes.success:
      toast.success(text)
      break

    case toastTypes.error:
      toast.error(text)
      break

    default:
      toast(text)
  }
}

export default addToast
