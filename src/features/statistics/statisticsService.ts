import axios from "axios"
import { EnrolledUsers } from "../enrollment/enrollmentService"
import { PreferenceLists } from "../account/accountService"
import { FinanceResponse } from "../finance/financeService"
axios.defaults.withCredentials = true
const API_URL = `${import.meta.env.VITE_SOME_KEY}`

const getEnrolledUsersStat = async (
  page_size: number
): Promise<EnrolledUsers> => {
  const response = await axios.get(API_URL + "enrollment/enrollments/", {
    params: {
      page_size: page_size,
    },
  })
  return response.data
}
const getPreferencesStat = async (
  page_size: number
): Promise<PreferenceLists> => {
  const response = await axios.get(API_URL + "account/preference/", {
    params: {
      page_size: page_size,
    },
  })
  return response.data
}
const getPendingTrainees = async (
  page_size: number
): Promise<FinanceResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page_size }

  params.is_completed = false
  params.is_rejected = false
  const config = {
    params,
  }
  const response = await axios.get(
    API_URL + "finance/trainee-payments/",

    config
  )

  return response.data
}
const getApprovedTrainees = async (
  page_size: number
): Promise<FinanceResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page_size }

  params.is_completed = true
  params.is_rejected = false
  const config = {
    params,
  }
  const response = await axios.get(
    API_URL + "finance/trainee-payments/",

    config
  )

  return response.data
}
const getRejectedTrainees = async (
  page_size: number
): Promise<FinanceResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page_size }

  params.is_completed = false
  params.is_rejected = true
  const config = {
    params,
  }
  const response = await axios.get(
    API_URL + "finance/trainee-payments/",

    config
  )

  return response.data
}
const statisticsService = {
  getEnrolledUsersStat,
  getPreferencesStat,
  getPendingTrainees,
  getApprovedTrainees,
  getRejectedTrainees,
}
export default statisticsService
