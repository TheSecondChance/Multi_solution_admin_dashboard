import { EnrollmentUpdate, TraineeEnrollment } from "./enrollmentService"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import enrollmentService, {
  EnrolledUsers,
  TrainingData,
  TrainingResponseData,
} from "./enrollmentService"

interface TrainingState {
  trainings: TrainingResponseData[] | null
  enrolledUsers:
    | EnrolledUsers
    | {
        count: 0
        next: null
        previous: null
        results: []
      }
  training: TrainingData | null
  isError: boolean
  traineeEnrollment:
    | TraineeEnrollment
    | {
        id: 0
        first_name: ""
        middle_name: ""
        last_name: ""
        training_type: ""
        enrollment_date: ""
        user: 0
        training: 0
      }
  isSuccess: boolean
  isLoading: boolean
  isUpdateTrainingLoading: boolean
  isDeletingTrainingLoading: boolean
  isDeletingTrainingSuccess: boolean
  isDeletingEnrollmentLoading: boolean
  isDeletingEnrollmentSuccess: boolean
  isUpdatingEnrollmentSuccess: boolean
  isUpdatingEnrollmentLoading: boolean
  message: string
}
const initialState: TrainingState = {
  trainings: [],
  enrolledUsers: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  training: null,
  traineeEnrollment: {
    id: 0,
    first_name: "",
    middle_name: "",
    last_name: "",
    training_type: "",
    enrollment_date: "",
    training: 0,
    user: 0,
  },
  isDeletingTrainingLoading: false,
  isDeletingTrainingSuccess: false,
  isUpdatingEnrollmentSuccess: false,
  isUpdatingEnrollmentLoading: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdateTrainingLoading: false,
  isDeletingEnrollmentLoading: false,
  isDeletingEnrollmentSuccess: false,
  message: "",
}

// Get Training List
export const getTrainingList = createAsyncThunk(
  "enrollment/getTraings",
  async (_, thunkAPI) => {
    try {
      return await enrollmentService.getTrainingList()
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.detail &&
          error.response.data.detail) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get Enrolled Users
export const getEnrolledUsers = createAsyncThunk(
  "enrollment/getEnrolledUser",
  async (page: number, thunkAPI) => {
    try {
      return await enrollmentService.getEnrolledUsers(page)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.detail &&
          error.response.data.detail) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get Trainee Enrollment
export const getTraineeEnrollment = createAsyncThunk(
  "enrollment/getTraineeEnrollment",
  async (id: number, thunkAPI) => {
    try {
      return await enrollmentService.getTraineeEnrollment(id)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.detail &&
          error.response.data.detail) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get Specific Training
export const getSpecificTraining = createAsyncThunk(
  "enrollment/getSpecificTraining",
  async (id: number, thunkAPI) => {
    try {
      return await enrollmentService.getSpecificTraining(id)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.detail &&
          error.response.data.detail) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// create new Training
export const createNewTraining = createAsyncThunk(
  "enrollment/createNewTraining",
  async (trainingData: TrainingData, thunkAPI) => {
    try {
      return await enrollmentService.createNewTraining(trainingData)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.detail &&
          error.response.data.detail) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const updateTraining = createAsyncThunk(
  "enrollment/updateTraining",
  async (payload: any, thunkAPI) => {
    try {
      const { id, trainingData } = payload
      return await enrollmentService.updateTraining(id, trainingData)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.phone_number[0] &&
          error.response.data.message) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const updateEnrollment = createAsyncThunk(
  "enrollment/updateEnrollment",
  async (
    {
      id,
      data,
    }: {
      id: string
      data: EnrollmentUpdate
    },
    thunkAPI
  ) => {
    try {
      return await enrollmentService.updateEnrollment(id, data)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.phone_number[0] &&
          error.response.data.message) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const deleteTraining = createAsyncThunk(
  "enrollment/deleteTraining",
  async (id: number, thunkAPI) => {
    try {
      return await enrollmentService.deleteTraining(id)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.phone_number[0] &&
          error.response.data.message) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const deleteEnrollment = createAsyncThunk(
  "enrollment/deleteEnrollment",
  async (id: number, thunkAPI) => {
    try {
      return await enrollmentService.deleteEnrollment(id)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.phone_number[0] &&
          error.response.data.message) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    reset: (state: {
      isLoading: boolean
      isSuccess: boolean
      isError: boolean
      message: string
      isDeletingTrainingLoading: boolean
      isDeletingTrainingSuccess: boolean
      isUpdateTrainingLoading: boolean
      isDeletingEnrollmentLoading: boolean
      isDeletingEnrollmentSuccess: boolean
      isUpdatingEnrollmentSuccess: boolean
      isUpdatingEnrollmentLoading: boolean
    }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isDeletingTrainingLoading = false
      state.isDeletingTrainingSuccess = false
      state.isError = false
      state.isDeletingEnrollmentLoading = false
      state.isDeletingEnrollmentSuccess = false
      state.isUpdatingEnrollmentLoading = false
      state.isUpdatingEnrollmentSuccess = false
      state.message = ""
      state.isUpdateTrainingLoading = false
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getTrainingList.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getTrainingList.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; trainings: any },
          action: { payload: PayloadAction<TrainingResponseData[]> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.trainings = action.payload
        }
      )
      .addCase(
        getTrainingList.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            trainings: []
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.trainings = []
        }
      )
      .addCase(getSpecificTraining.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getSpecificTraining.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; training: any },
          action: { payload: PayloadAction<TrainingData> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.training = action.payload
        }
      )
      .addCase(
        getSpecificTraining.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            training: TrainingData | null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.training = null
        }
      )
      .addCase(createNewTraining.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        createNewTraining.fulfilled,
        (state: {
          isLoading: boolean
          isSuccess: boolean
          message: string
        }) => {
          state.isLoading = false
          state.isSuccess = true

          state.message = "You've added new training successfully."
        }
      )
      .addCase(
        createNewTraining.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        updateTraining.pending,
        (state: { isUpdateTrainingLoading: boolean }) => {
          state.isUpdateTrainingLoading = true
        }
      )
      .addCase(
        updateTraining.fulfilled,
        (state: {
          isUpdateTrainingLoading: boolean
          isSuccess: boolean
          message: string
        }) => {
          state.isUpdateTrainingLoading = false
          state.isSuccess = true

          state.message = "You've update the training successfully."
        }
      )
      .addCase(
        updateTraining.rejected,
        (
          state: {
            isUpdateTrainingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdateTrainingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(getEnrolledUsers.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getEnrolledUsers.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; enrolledUsers: any },
          action: { payload: PayloadAction<any> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.enrolledUsers = action.payload
        }
      )
      .addCase(
        getEnrolledUsers.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            enrolledUsers: []
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.enrolledUsers = []
        }
      )
      .addCase(
        deleteTraining.pending,
        (state: { isDeletingTrainingLoading: boolean }) => {
          state.isDeletingTrainingLoading = true
        }
      )
      .addCase(
        deleteTraining.fulfilled,
        (state: {
          isDeletingTrainingLoading: boolean
          isDeletingTrainingSuccess: boolean
          message: string
        }) => {
          state.isDeletingTrainingLoading = false
          state.isDeletingTrainingSuccess = true
        }
      )
      .addCase(
        deleteTraining.rejected,
        (
          state: {
            isDeletingTrainingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isDeletingTrainingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        deleteEnrollment.pending,
        (state: { isDeletingEnrollmentLoading: boolean }) => {
          state.isDeletingEnrollmentLoading = true
        }
      )
      .addCase(
        deleteEnrollment.fulfilled,
        (state: {
          isDeletingEnrollmentLoading: boolean
          isDeletingEnrollmentSuccess: boolean
          message: string
        }) => {
          state.isDeletingEnrollmentLoading = false
          state.isDeletingEnrollmentSuccess = true
        }
      )
      .addCase(
        deleteEnrollment.rejected,
        (
          state: {
            isDeletingEnrollmentLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isDeletingEnrollmentLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        updateEnrollment.pending,
        (state: { isUpdatingEnrollmentLoading: boolean }) => {
          state.isUpdatingEnrollmentLoading = true
        }
      )
      .addCase(
        updateEnrollment.fulfilled,
        (state: {
          isUpdatingEnrollmentLoading: boolean
          isUpdatingEnrollmentSuccess: boolean
          message: string
        }) => {
          state.isUpdatingEnrollmentLoading = false
          state.isUpdatingEnrollmentSuccess = true
        }
      )
      .addCase(
        updateEnrollment.rejected,
        (
          state: {
            isUpdatingEnrollmentLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdatingEnrollmentLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        getTraineeEnrollment.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getTraineeEnrollment.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            message: string
            traineeEnrollment: any
          },
          action: { payload: PayloadAction<any> }
        ) => {
          state.isLoading = false
          state.isSuccess = true
          state.traineeEnrollment = action.payload
        }
      )
      .addCase(
        getTraineeEnrollment.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
  },
})

export const { reset } = enrollmentSlice.actions
export default enrollmentSlice.reducer
