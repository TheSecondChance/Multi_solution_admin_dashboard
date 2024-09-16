/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import accountService, {
  PreferenceLists,
  TraineeResponseData,
  TraineesData,
  User,
  UsersData,
} from "./accountService"

interface TrainineesState {
  trainees: TraineesData | { count: 0; next: null; previous: null; results: [] }
  users: UsersData | { count: 0; next: null; previous: null; results: [] }
  preferences:
    | PreferenceLists
    | { count: 0; next: null; previous: null; results: [] }
  staff:
    | User
    | {
        id: 0
        first_name: ""
        middle_name: ""
        last_name: ""
        phone_number: ""
        training: 0
        training_type: ""
        account_options: 0
        bank_name: ""
        trans_num: ""
        email: ""
        gender: ""
        country: ""
        city: ""
        register_date: ""
        is_superuser: false
        is_staff: false
        is_active: false
        is_phone_verified: false
        last_login: ""
        date_joined: ""
        is_trainee: false
        password: ""
      }
  trainee: any
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isUpdatingTraineeSuccess: boolean
  isUpdatingTraineeLoading: boolean
  isDeletingUserSuccess: boolean
  isDeletingUserLoading: boolean
  isUpdatingUserSuccess: boolean
  isUpdatingUserLoading: boolean
  message: string
}
const initialState: TrainineesState = {
  trainees: { count: 0, next: null, previous: null, results: [] },
  users: { count: 0, next: null, previous: null, results: [] },
  preferences: { count: 0, next: null, previous: null, results: [] },
  trainee: null,
  staff: {
    id: 0,
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    training: 0,
    training_type: "",
    account_options: 0,
    bank_name: "",
    trans_num: "",
    email: "",
    gender: "",
    country: "",
    city: "",
    register_date: "",
    is_superuser: false,
    is_staff: true,
    is_active: false,
    is_phone_verified: false,
    last_login: "",
    date_joined: "",
    is_trainee: false,
    password: "",
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdatingTraineeSuccess: false,
  isUpdatingTraineeLoading: false,
  isDeletingUserSuccess: false,
  isDeletingUserLoading: false,
  isUpdatingUserSuccess: false,
  isUpdatingUserLoading: false,
  message: "",
}

// Get All Trainees
export const getAllTrainees = createAsyncThunk(
  "account/getAllTrainees",
  async (
    {
      page,
      filter,
    }: {
      page: number
      filter?: {
        first_name?: string
        phone_number?: string
        date_joined?: Date
        page_size?: string
      }
    },

    thunkAPI
  ) => {
    try {
      return await accountService.getAllTrainees(page, filter)
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
// Get All Users we'll then filter trainess and admins
export const getAllUsers = createAsyncThunk(
  "account/getAllUserss",
  async (
    {
      page,
      filter,
    }: {
      page: number
      filter?: {
        first_name?: string
        phone_number?: string
        date_joined?: Date
        page_size?: string
      }
    },
    thunkAPI
  ) => {
    try {
      return await accountService.getAllUsers(page, filter)
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
// Get Trainee By ID
export const getTraineeById = createAsyncThunk(
  "account/getTraineeById",
  async (id: number, thunkAPI) => {
    try {
      return await accountService.getTraineeById(id)
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
// Get User by phone number
export const getUserByPhoneNumber = createAsyncThunk(
  "account/getUserByPhoneNumber",
  async (phone_number: number, thunkAPI) => {
    try {
      return await accountService.getTraineeById(phone_number)
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
export const updateTrainee = createAsyncThunk<TraineeResponseData, any>(
  "auth/updateTrainee",
  async (trainee, thunkAPI) => {
    try {
      const { phone_number } = trainee
      return await accountService.updateTrainee(phone_number, trainee)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          (error.response.data.phone_number
            ? error.response.data.phone_number[0]
            : error.response.data.email
            ? error.response.data.email[0]
            : error.response.data.trans_num
            ? error.response.data.trans_num[0]
            : error.response.data.message)) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Delete User It can be Trainee or staff

export const deleteUser = createAsyncThunk(
  "account/deleteUser",
  async (phone_number: string, thunkAPI) => {
    try {
      return await accountService.deleteUser(phone_number)
    } catch (error: any) {
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
// Update User
export const updateUser = createAsyncThunk<User, any>(
  "auth/updateUser",
  async (user, thunkAPI) => {
    try {
      const { phone_number } = user
      return await accountService.updateUser(phone_number, user)
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
// Get Preference List
export const getPreferenceList = createAsyncThunk(
  "account/getPreferenceList",
  async (
    {
      page,
      filter,
    }: {
      page?: number
      filter?: {
        bank?: string
        language?: string
        page_size?: number
      }
    },
    thunkAPI
  ) => {
    try {
      return await accountService.getTPreferenceList(page, filter)
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

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: (state: {
      isLoading: boolean
      isSuccess: boolean
      isError: boolean
      isUpdatingTraineeSuccess: boolean
      isUpdatingTraineeLoading: boolean
      isDeletingUserSuccess: boolean
      isDeletingUserLoading: boolean
      isUpdatingUserSuccess: boolean
      isUpdatingUserLoading: boolean
      message: string
    }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isUpdatingTraineeSuccess = false
      state.isUpdatingTraineeLoading = false
      state.isDeletingUserLoading = false
      state.isDeletingUserSuccess = false
      state.isUpdatingUserLoading = false
      state.isUpdatingUserSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllTrainees.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getAllTrainees.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; trainees: any },
          action: {
            payload: PayloadAction<any>
          }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.trainees = action.payload
        }
      )
      .addCase(
        getAllTrainees.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            trainees: TraineeResponseData | null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.trainees = null
        }
      )
      .addCase(getAllUsers.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getAllUsers.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; users: any },
          action: {
            payload: PayloadAction<any>
          }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.users = action.payload
        }
      )
      .addCase(
        getAllUsers.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            users: UsersData | null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.users = null
        }
      )
      .addCase(getTraineeById.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getTraineeById.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; trainee: any },
          action: {
            payload: PayloadAction<any>
          }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.trainee = action.payload
        }
      )
      .addCase(
        getTraineeById.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            trainee: null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.trainee = null
        }
      )
      .addCase(
        updateTrainee.pending,
        (state: { isUpdatingTraineeLoading: boolean }) => {
          state.isUpdatingTraineeLoading = true
        }
      )
      .addCase(
        updateTrainee.fulfilled,
        (state: {
          isUpdatingTraineeLoading: boolean
          isUpdatingTraineeSuccess: boolean
          trainee: any
        }) => {
          state.isUpdatingTraineeLoading = false
          state.isUpdatingTraineeSuccess = true
        }
      )
      .addCase(
        updateTrainee.rejected,
        (
          state: {
            isUpdatingTraineeLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdatingTraineeLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        deleteUser.pending,
        (state: { isDeletingUserLoading: boolean }) => {
          state.isDeletingUserLoading = true
        }
      )
      .addCase(
        deleteUser.fulfilled,
        (state: {
          isDeletingUserLoading: boolean
          isDeletingUserSuccess: boolean
          trainee: any
        }) => {
          state.isDeletingUserLoading = false
          state.isDeletingUserSuccess = true
        }
      )
      .addCase(
        deleteUser.rejected,
        (
          state: {
            isDeletingUserLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isDeletingUserLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        getUserByPhoneNumber.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getUserByPhoneNumber.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; staff: any },
          action: {
            payload: PayloadAction<any>
          }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.staff = action.payload
        }
      )
      .addCase(
        getUserByPhoneNumber.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            staff: object
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.staff = {}
        }
      )
      .addCase(
        updateUser.pending,
        (state: { isUpdatingUserLoading: boolean }) => {
          state.isUpdatingUserLoading = true
        }
      )
      .addCase(
        updateUser.fulfilled,
        (state: {
          isUpdatingUserLoading: boolean
          isUpdatingUserSuccess: boolean
          User: any
        }) => {
          state.isUpdatingUserLoading = false
          state.isUpdatingUserSuccess = true
        }
      )
      .addCase(
        updateUser.rejected,
        (
          state: {
            isUpdatingUserLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdatingUserLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(getPreferenceList.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getPreferenceList.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; preferences: any },
          action: {
            payload: PayloadAction<any>
          }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.preferences = action.payload
        }
      )
      .addCase(
        getPreferenceList.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            preferences: PreferenceLists
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.preferences = {
            count: 0,
            next: "",
            previous: "",
            results: [],
          }
        }
      )
  },
})

export const { reset } = accountSlice.actions
export default accountSlice.reducer
