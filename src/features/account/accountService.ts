import axios from "axios"
axios.defaults.withCredentials = true

const API_URL = `${import.meta.env.VITE_SOME_KEY}`
export interface TraineeResults {
  account_options: string
  bank_name: string
  city: string
  country: string
  email: string
  first_name: string
  gender: string
  id: string
  last_name: string
  middle_name: string
  phone_number: string
  register_date: string
  training: string
  training_type: string
  trans_num: string
}
export interface TraineeResponseData {
  count: number
  next: string
  previous: number | null
  results: TraineeResults[]
}

export interface TraineeUpdateData {
  first_name?: string
  middle_name?: string
  last_name?: string
  phone_number?: string
  training?: number | undefined
  account_options?: number | undefined
  trans_num?: string
  email?: string
  gender?: string
  country?: string
  city?: string
}
export interface User {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone_number: string
  training: number
  training_type: string
  account_options: number
  bank_name: string
  trans_num: string
  email: string
  gender: string
  country: string
  city: string
  register_date: string
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  is_phone_verified: boolean
  last_login: string
  date_joined: string
  is_trainee: boolean
  password: string
}
export interface Trainee {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone_number: string
  training: number
  training_type: string
  account_options: number
  bank_name: string
  trans_num: string
  email: string
  gender: string
  country: string
  city: string
  register_date: string

  is_phone_verified: boolean
}
export interface UsersData {
  count: number
  next: string | null
  previous: string | null
  results: User[]
}
export interface TraineesData {
  count: number
  next: string | null
  previous: string | null
  results: Trainee[]
}
export interface Preference {
  id: number
  tg_id: number
  language: string
  created_at: string
  contact: number
  bank: number
}
export interface PreferenceLists {
  count: number
  next: string
  previous: string
  results: Preference[]
}

// Get All Users then we'll only filter admins
const getAllUsers = async (
  page: number = 1,
  filter: {
    first_name?: string
    phone_number?: string
    date_joined?: Date
    page_size?: string
  } = {}
): Promise<UsersData> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page }

  if (filter.first_name) params.first_name = filter.first_name
  if (filter.phone_number) params.phone_number = filter.phone_number
  if (filter.date_joined) params.date_joined = filter.date_joined
  if (filter.page_size) params.page_size = filter.page_size
  const response = await axios.get(`${API_URL}account/staff/`, {
    params,
  })

  return response.data
}
// Get Trainee
const getAllTrainees = async (
  page: number = 1,
  filter: {
    first_name?: string
    phone_number?: string
    date_joined?: Date
    page_size?: string
  } = {}
): Promise<TraineesData> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page }

  if (filter.first_name) params.first_name = filter.first_name
  if (filter.phone_number) params.phone_number = filter.phone_number
  if (filter.date_joined) params.date_joined = filter.date_joined
  if (filter.page_size) params.page_size = filter.page_size
  const response = await axios.get(`${API_URL}account/trainee/`, {
    params,
  })

  return response.data
}
// Get Trainee by id  can also fetch users/staff because we're using /users route
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTraineeById = async (id: number): Promise<any> => {
  const response = await axios.get(API_URL + `account/users/${id}`)

  return response.data
}
// Update Trainee
const updateTrainee = async (
  phone_number: string,
  traineeData: TraineeUpdateData
): Promise<TraineeResponseData> => {
  console.log("TD ", phone_number, traineeData)
  const response = await axios.put(
    API_URL + `account/trainee/${phone_number}/`,
    traineeData
  )

  return response.data
}
// Update user / staff
const updateUser = async (
  phone_number: string,
  userData: User
): Promise<User> => {
  const response = await axios.put(
    API_URL + `account/users/${phone_number}/`,
    userData
  )

  return response.data
}

// Delete Trainee or user
const deleteUser = async (phone_number: string) => {
  const response = await axios.delete(API_URL + `account/users/${phone_number}`)
  return response.data
}
// Get Preferences list
const getTPreferenceList = async (
  page?: number,
  filter: {
    language?: string
    bank?: string
    page_size?: number
  } = {}
): Promise<PreferenceLists> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page }

  if (filter.language) params.language = filter.language
  if (filter.bank) params.bank = filter.bank
  if (filter.page_size) params.page_size = filter.page_size

  const response = await axios.get(
    API_URL + "account/preference/",

    { params }
  )

  return response.data
}
const accountServics = {
  updateTrainee,
  getAllTrainees,
  getTraineeById,
  getAllUsers,
  deleteUser,
  updateUser,
  getTPreferenceList,
}

export default accountServics
