import axios from "axios"
const API_URL = `${import.meta.env.VITE_SOME_KEY}`
axios.defaults.withCredentials = true

export interface EnrolledUser {
  id: number
  first_name: string
  last_name: string
  training_type: string
  enrollment_date: string
  is_complete: boolean
  user: number
  training: number
}
export interface EnrollmentUpdate {
  is_complete?: boolean
  user?: number
  training?: number
}
export interface EnrolledUsers {
  count: number
  next: string | null
  previous: string | null
  results: EnrolledUser[]
}

export interface TrainingResponseData {
  created_at: string
  id: number
  training: string
  price: number
  is_active: boolean
  trainee: number | null
}
export interface TrainingData {
  training: string
  price?: number | undefined
  is_active?: boolean
  trainee?: number | undefined
}
export interface TraineeEnrollment {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  training_type: string
  enrollment_date: string
  is_complete: boolean
  user: number
  training: number
}

// Get Training list
const getTrainingList = async (): Promise<TrainingResponseData[]> => {
  const response = await axios.get(API_URL + "enrollment/training/")

  return response.data
}
// Get Trainee Enrollment
const getTraineeEnrollment = async (id: number): Promise<TraineeEnrollment> => {
  const response = await axios.get(API_URL + `enrollment/enrollments/${id}/`)

  return response.data
}
// Get Enrolled Users
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getEnrolledUsers = async (page: number = 1): Promise<EnrolledUsers> => {
  const config = {
    params: {
      page: page,
    },
  }

  try {
    const response = await axios.get(
      `${API_URL}enrollment/enrollments/`,
      config
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
// Get Specific Training
const getSpecificTraining = async (
  id: number
): Promise<TrainingResponseData[]> => {
  const response = await axios.get(API_URL + `enrollment/training/${id}`)

  return response.data
}
// Create new Training
const createNewTraining = async (
  trainingData: TrainingData
): Promise<TrainingResponseData[]> => {
  const response = await axios.post(
    API_URL + "enrollment/training/",
    trainingData
  )

  return response.data
}
// Create update Training
const updateTraining = async (
  id: number,
  trainingData: TrainingData
): Promise<TrainingResponseData> => {
  const response = await axios.put(
    API_URL + `enrollment/training/${id}/`,
    trainingData
  )

  return response.data
}
//deleteTraining
const deleteTraining = async (id: number) => {
  const response = await axios.delete(API_URL + `enrollment/training/${id}/`)

  return response.data
}
//delete Enrollment
const deleteEnrollment = async (id: number) => {
  const response = await axios.delete(API_URL + `enrollment/enrollments/${id}/`)

  return response.data
}
//Update Enrollment
const updateEnrollment = async (id: string, data: EnrollmentUpdate) => {
  const response = await axios.put(
    API_URL + `enrollment/enrollments/${id}/`,
    data
  )

  return response.data
}

const enrollmentService = {
  getTrainingList,
  createNewTraining,
  getSpecificTraining,
  updateTraining,
  getEnrolledUsers,
  deleteTraining,
  deleteEnrollment,
  updateEnrollment,
  getTraineeEnrollment,
}

export default enrollmentService
