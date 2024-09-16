import axios from "axios"
const API_URL = `${import.meta.env.VITE_SOME_KEY}`

export interface ContactUsData {
  first_name: string
  last_name?: string
  email?: string
  message: string
}
export interface ContactResponseData {
  id: number
  first_name: string
  last_name: string
  email: string
  message: string
}

// Contact us
const contactUs = async (
  contactData: ContactUsData
): Promise<ContactResponseData> => {
  const response = await axios.post(API_URL + "utils/contactus/", contactData, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response.data
}

const contactService = {
  contactUs,
}

export default contactService
