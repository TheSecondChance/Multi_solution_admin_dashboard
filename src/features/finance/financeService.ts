import axios from "axios"
const API_URL = `${import.meta.env.VITE_SOME_KEY}`
axios.defaults.withCredentials = true

export interface GetBankAccountsResponseData {
  id: number
  account_number: string
  account_name: string
  bank_name: string
}
export interface BankAccount {
  accountNumber: string
  accountName: string
  bankName: string
}
export interface MonthlyPayerUserUpdate {
  trans_num: string
  is_completed?: true
  created_at?: string
  user?: number
  account_options: number
}
export interface MonthlyPayerUserData {
  id: number
  first_name: string
  last_name: string
  bank_name: string
  training: string
  phone_number: string
  trans_num: string
  is_completed: boolean
  created_at: string
  user: number
  account_options: number
}
export interface Transaction {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  training: string
  phone_number: string
  bank_name: string
  trans_num: string
  amount: string
  is_completed: boolean
  is_rejected: boolean
  created_at: string
  schedule?: string
  user: number
}
export interface Finance {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  bank_name: string
  training: string
  phone_number: string
  trans_num: string
  is_completed: boolean
  is_rejected: boolean
  schedule?: string
  created_at: string
  user: number
  account_options: number
}
export interface FinanceResponse {
  count: number
  next: string | null
  previous: string | null
  results: Finance[]
}
export interface TraineePaymentList {
  id: string
  first_name: string
  last_name: string
  training: string
  phone_number: string
  bank_name: string
  trans_num: string
  amount: string
  is_completed: boolean
  is_rejected: boolean

  created_at: string
  user: string
}
export interface TraineeStatus {
  phone_number?: string
  id?: number
  is_rejected: boolean

  amount?: string
  is_completed: boolean
  created_at?: string
  user: number
}
export interface MonthlyPaymentCycle {
  id: number
  opening_date: Date
  closing_date: Date
  is_active: boolean
}

// Get bank accounts list
const getBankAccountList = async (): Promise<GetBankAccountsResponseData[]> => {
  const response = await axios.get(API_URL + "finance/bank-accounts/")

  return response.data
}
// Get Monthly Payment Cycle lists
const getMonthlyPaymentCycleList = async (): Promise<MonthlyPaymentCycle[]> => {
  const response = await axios.get(API_URL + "finance/monthly-payment-cycle/")

  return response.data
}
// Get Monthly Payment Cycle
const getMonthlyPaymentCycle = async (
  id: number
): Promise<MonthlyPaymentCycle> => {
  const response = await axios.get(
    API_URL + `finance/monthly-payment-cycle/${id}/`
  )

  return response.data
}
// Approve Trainee has completed payment
const approveTrainee = async (
  paymentData: TraineeStatus
): Promise<TraineePaymentList> => {
  const { phone_number, id } = paymentData
  const data = {
    amount: paymentData.amount,
    is_completed: true,
    is_rejected: false,
    user: paymentData.user,
  }
  const response = await axios.put(
    API_URL + `finance/trainee-payments/${id}/phone/${phone_number}/`,
    data
  )

  return response.data
}
// Reject Trainee payment
const rejectTrainee = async (
  paymentData: TraineeStatus
): Promise<TraineePaymentList> => {
  const { phone_number, id } = paymentData

  const data = {
    amount: paymentData.amount,
    is_completed: false,
    is_rejected: true,
    user: paymentData.user,
  }
  const response = await axios.put(
    API_URL + `finance/trainee-payments/${id}/phone/${phone_number}/`,
    data
  )

  return response.data
}
// set to pending Trainee payment
const setTraineeToPending = async (
  paymentData: TraineeStatus
): Promise<TraineePaymentList> => {
  const { phone_number, id } = paymentData
  const data = {
    amount: paymentData.amount,
    is_completed: false,
    is_rejected: false,
    user: paymentData.user,
  }
  const response = await axios.put(
    API_URL + `finance/trainee-payments/${id}/phone/${phone_number}/`,
    data
  )
  return response.data
}
// Approve Trainee has completed payment -->for monthly payers
const approveMonthlyPayerTrainee = async (
  paymentData: TraineeStatus
): Promise<Finance> => {
  const { phone_number } = paymentData
  const data = {
    amount: paymentData.amount,
    is_completed: true,
    is_rejected: false,
    user: paymentData.user,
  }
  const response = await axios.put(
    API_URL +
      `finance/monthly-payments/${paymentData.id}/phone/${phone_number}/`,
    data
  )

  return response.data
}
// Reject Trainee payment --> for monthly payers
const rejectMonthlyPayerTrainee = async (
  paymentData: TraineeStatus
): Promise<Finance> => {
  const { phone_number } = paymentData
  const data = {
    amount: paymentData.amount,
    is_completed: false,
    is_rejected: true,
    user: paymentData.user,
  }
  const response = await axios.put(
    API_URL +
      `finance/monthly-payments/${paymentData.id}/phone/${phone_number}/`,
    data
  )

  return response.data
}
// set to pending Trainee payment -->for monthly payers
const setMonthlyPayerTraineeToPending = async (
  paymentData: TraineeStatus
): Promise<Finance> => {
  const { phone_number } = paymentData
  const data = {
    amount: paymentData.amount,
    is_completed: false,
    is_rejected: false,
    user: paymentData.user,
  }
  const response = await axios.put(
    API_URL +
      `finance/monthly-payments/${paymentData.id}/phone/${phone_number}/`,
    data
  )

  return response.data
}
// Get Trainee payment list --- for fixed payment
const getTraineePaymentList = async (
  page: number = 1,

  filter: { isCompleted?: string; isRejected?: string } = {}
): Promise<FinanceResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page }

  if (filter.isCompleted) params.is_completed = filter.isCompleted
  if (filter.isRejected) params.is_rejected = filter.isRejected
  const config = {
    params,
  }
  const response = await axios.get(
    API_URL + "finance/trainee-payments/",

    config
  )

  return response.data
}
// Get Monthly Payer Trainees payment list
const getMonthlyPayerTraineesPaymentList = async (
  page: number = 1,

  filter: { isCompleted?: string; isRejected?: string } = {}
): Promise<TraineePaymentList> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = { page }

  if (filter.isCompleted) params.is_completed = filter.isCompleted
  if (filter.isRejected) params.is_rejected = filter.isRejected
  const config = {
    params,
  }
  const response = await axios.get(
    API_URL + "finance/monthly-payments/",
    config
  )

  return response.data
}
// create bank create
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBank = async (
  bankAccountData: BankAccount
): Promise<GetBankAccountsResponseData> => {
  const { accountName, bankName, accountNumber } = bankAccountData
  const data = {
    account_number: accountNumber,
    account_name: accountName,
    bank_name: bankName,
  }
  const response = await axios.post(API_URL + "finance/bank-accounts/", data)

  return response.data
}
//update bank
const updateBank = async (
  bankAccountData: GetBankAccountsResponseData
): Promise<GetBankAccountsResponseData> => {
  const { account_name, bank_name, account_number } = bankAccountData
  const { id } = bankAccountData
  const data = {
    account_number: account_number,
    account_name: account_name,
    bank_name: bank_name,
  }
  const response = await axios.put(
    API_URL + `finance/bank-accounts/${id}/`,
    data
  )

  return response.data
}
//Delete bank
const deleteBank = async (id: number) => {
  const response = await axios.delete(API_URL + `finance/bank-accounts/${id}/`)

  return response.data
}
//update Monthly payment cycle
const updateMonthlyPaymentCycle = async (
  data: { opening_date: Date; closing_date: Date; is_active: boolean },
  id: number
): Promise<MonthlyPaymentCycle> => {
  const response = await axios.put(
    API_URL + `finance/monthly-payment-cycle/${id}/`,
    data
  )

  return response.data
}
//create Monthly payment cycle
const createMonthlyPaymentCycle = async (data: {
  opening_date: Date
  closing_date: Date
  is_active: boolean
}): Promise<MonthlyPaymentCycle> => {
  const response = await axios.post(
    API_URL + `finance/monthly-payment-cycle/`,
    data
  )

  return response.data
}
//Delete Monthly Payment Cycle
const deleteMonthlyPaymentCycle = async (id: number) => {
  const response = await axios.delete(
    API_URL + `finance/monthly-payment-cycle/${id}/`
  )

  return response.data
}
// Get TraineePaymentData
const getTraineePaymentData = async (
  phone_number: string
): Promise<Transaction[]> => {
  const response = await axios.get(
    API_URL + `finance/trainee-payments/phone/${phone_number}/`
  )

  return response.data
}
// Get Monthly payer TraineePaymentData
const getMonthlyPayerTraineePaymentData = async (
  phone_number: string
): Promise<Transaction[]> => {
  const response = await axios.get(
    API_URL + `finance/monthly-payments/phone/${phone_number}/`
  )

  return response.data
}
// Create Monthly Payer User
const createMonthlyPayerUser = async (
  paymentData: MonthlyPayerUserUpdate
): Promise<MonthlyPayerUserData> => {
  const response = await axios.post(
    API_URL + `finance/monthly-payments/`,
    paymentData
  )

  return response.data
}

const financeService = {
  getBankAccountList,
  getMonthlyPayerTraineesPaymentList,
  updateMonthlyPaymentCycle,
  createBank,
  rejectTrainee,
  getTraineePaymentList,
  setTraineeToPending,
  approveTrainee,
  updateBank,
  deleteBank,
  approveMonthlyPayerTrainee,
  rejectMonthlyPayerTrainee,
  setMonthlyPayerTraineeToPending,
  getMonthlyPaymentCycleList,
  getMonthlyPaymentCycle,
  createMonthlyPaymentCycle,
  deleteMonthlyPaymentCycle,
  getTraineePaymentData,
  createMonthlyPayerUser,
  getMonthlyPayerTraineePaymentData,
}

export default financeService
