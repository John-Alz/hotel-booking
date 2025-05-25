import { toast } from "react-toastify"


export const notifyService = {
    success: (message) => {
        toast.success(message)
    },
    waranig: (message) => {
        toast.warning(message)
    },
    error: (message) => {
        toast.error(message)
    }
}