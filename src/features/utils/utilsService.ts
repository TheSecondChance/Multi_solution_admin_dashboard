import axios from "axios"
export interface ContactForm {
  subject?: string
  email: string
  message: string
}
axios.defaults.withCredentials = true

const API_URL = `${import.meta.env.VITE_SOME_KEY}`

const createContact = async (data: ContactForm) => {
  const response = await axios.post(API_URL + `utils/admin-email/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.data
}
const verifyOTP = async (data: { otp: string; email: string }) => {
  const response = await axios.post(API_URL + `account/verify-otp/`, data)
  return response.data
}

const utilsService = {
  createContact,
  verifyOTP,
}

export default utilsService
