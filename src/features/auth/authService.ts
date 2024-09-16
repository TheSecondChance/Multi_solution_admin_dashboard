import axios from "axios"
import { User } from "../account/accountService"
import Cookies from "js-cookie"
const API_URL = `${import.meta.env.VITE_SOME_KEY}`
axios.defaults.withCredentials = true

export interface LoginData {
  phone_number: string
  password: string
}
export interface ResetPasswordData {
  otp: string
  emai: string
  new_password: string
}
export interface ForgetPasswordData {
  email: string
}
export interface TraineeData {
  first_name: string
  middle_name?: string
  last_name: string
  phone_number: string
  training: number | undefined
  account_options: number | undefined
  trans_num: string
  email?: string
  gender?: string
  country?: string
  city?: string
  is_reg_complete?: boolean
}
export interface Staff {
  first_name: string
  middle_name: string
  last_name: string
  phone_number: string
  training?: number
  account_options?: number
  trans_num?: string
  email: string
  gender: string
  country: string
  city: string
  register_date?: string
  is_superuser: boolean
  is_staff: boolean
  is_active?: boolean
  is_phone_verified: boolean
  last_login?: string
  date_joined?: string
  is_trainee?: boolean
  password: string
}
export interface StaffResponseData {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone_number: string
  training?: number
  account_options?: number
  trans_num?: string
  email: string
  gender: string
  country: string
  city: string
  register_date?: string
  is_superuser: boolean
  is_staff: boolean
  is_active?: boolean
  is_phone_verified: boolean
  last_login?: string
  date_joined?: string
  is_trainee?: boolean
  password: string
}

export interface UserData {
  first_name: string
  middle_name: string
  last_name: string
  phone_number: string
  training?: number | undefined
  account_options?: number | undefined
  trans_num?: string
  email?: string
  gender?: string
  country?: string
  city?: string
  password: string
}
export interface UserResponseData {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone_number: string
  training?: number | undefined
  account_options?: number | undefined
  trans_num?: string
  email?: string
  gender?: string
  country?: string
  city?: string
  password: string
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
export interface TraineeResponseData {
  id: number
  first_name: string
  middle_name?: string
  last_name: string
  phone_number: string
  training: number
  account_options: number
  trans_num: string
  email?: string
  gender?: string
  country?: string
  city?: string
}

// Register Trainee
const registerTrainee = async (
  traineeData: TraineeData
): Promise<TraineeResponseData> => {
  const response = await axios.post(API_URL + "account/trainee/", traineeData)

  return response.data
}

// Register User AKA Staff
const registerUser = async (userData: Staff): Promise<StaffResponseData> => {
  const response = await axios.post(API_URL + "account/users/", userData)

  return response.data
}
// UserLogin
const Login = async (data: LoginData): Promise<LoginData> => {
  const response = await axios.post(API_URL + "account/login/", data)
  console.log("Logged in user data: ", response.headers)
  if (response.data) {
    const dataWithPhoneNumber = {
      ...response.data,
      phone_number: data.phone_number,
    }
    const expiresInMinutes = 1435
    const expiresInDays = expiresInMinutes / (24 * 60)
    localStorage.setItem("user", JSON.stringify(dataWithPhoneNumber))
    Cookies.set("authToken", response.data?.message, { expires: expiresInDays })
    Cookies.set("user", JSON.stringify(dataWithPhoneNumber), {
      expires: expiresInDays,
    })
  }
  return response.data
}
// Get logged in user
const getMe = async (phone_number: string): Promise<User> => {
  const response = await axios.get(API_URL + `account/users/${phone_number}/`)

  return response.data
}
// Get Trainee
const getTrainee = async (
  phone_number: string
): Promise<TraineeResponseData> => {
  const response = await axios.get(API_URL + `account/trainee/${phone_number}`)

  return response.data
}

//send Email otp to reset password
const forgetPassword = async (
  data: ForgetPasswordData
): Promise<ForgetPasswordData> => {
  console.log("data from service ", data)
  const response = await axios.post(API_URL + `account/forgot-password/`, data)
  if (response.status == 200) {
    sessionStorage.setItem("backupEmail", data.email.toString())
  }
  return response.data
}
//send reset password
const resetPassword = async (
  data: ResetPasswordData
): Promise<ResetPasswordData> => {
  const response = await axios.post(API_URL + `account/reset-password/`, data)

  return response.data
}
// Logout user
const logout = () => {
  localStorage.removeItem("user")
  Cookies.remove("authToken")
  Cookies.remove("user")
}
const authService = {
  Login,
  registerTrainee,
  logout,
  resetPassword,
  forgetPassword,
  registerUser,
  getMe,
  getTrainee,
}

export default authService
