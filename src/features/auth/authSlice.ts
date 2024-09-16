/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService, {
  ForgetPasswordData,
  LoginData,
  ResetPasswordData,
  StaffResponseData,
  TraineeData,
  TraineeResponseData,
} from "./authService"
import { User } from "../account/accountService"
import Cookies from "js-cookie"
// Get user from localStorage
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const user = Cookies.get("user") && JSON.parse(Cookies.get("user"))
const traineeString = localStorage.getItem("tainee")
const trainee = traineeString ? JSON.parse(traineeString) : null

interface AuthState {
  user: LoginData | null
  admin: User
  forgetPasswordData: ForgetPasswordData | { email: "" }
  trainee: TraineeResponseData | null
  traineeData: TraineeData | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  isRegisteringUserSuccess: boolean
  isRegisteringUserLoading: boolean
  isRegisteringTraineeSuccess: boolean
  isRegisteringTraineeLoading: boolean
  message: string
}

const initialState: AuthState = {
  user: user ? user : null,
  admin: {
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
    is_staff: false,
    is_active: false,
    is_phone_verified: false,
    last_login: "",
    date_joined: "",
    is_trainee: false,
    password: "",
  },
  forgetPasswordData: { email: "" },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isRegisteringUserSuccess: false,
  isRegisteringUserLoading: false,
  isRegisteringTraineeSuccess: false,
  isRegisteringTraineeLoading: false,
  message: "",
  trainee: trainee ? trainee : null,
  traineeData: null,
}

export const LoginUser = createAsyncThunk<LoginData, any>(
  "auth/LoginUser",
  async (data, thunkAPI) => {
    try {
      return await authService.Login(data)
    } catch (error: any) {
      const message =
        (error.response && error.response.data.non_field_errors[0]) ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const forgetPassword = createAsyncThunk<ForgetPasswordData, any>(
  "auth/forgetPassword",
  async (data: ForgetPasswordData, thunkAPI) => {
    try {
      return await authService.forgetPassword(data)
    } catch (error: any) {
      console.log("error", error)

      const message =
        (error.response && error.response.data.email) || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const resetPassword = createAsyncThunk<ResetPasswordData, any>(
  "auth/resetPassword",
  async (data: ResetPasswordData, thunkAPI) => {
    try {
      return await authService.resetPassword(data)
    } catch (error: any) {
      console.log("error", error)
      const message =
        (error.response && error.response.data.non_field_errors[0]) ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const getMe = createAsyncThunk<User, any>(
  "auth/getMe",
  async (_, thunkAPI) => {
    try {
      const userDataString = Cookies.get("user")
      const phone_number =
        userDataString && JSON.parse(userDataString)?.phone_number
      return await authService.getMe(phone_number)
    } catch (error: any) {
      const message =
        (error.response && error.response.data.detail) || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})
export const registerTrainee = createAsyncThunk<TraineeResponseData, any>(
  "auth/registerTrainee",
  async (trainee, thunkAPI) => {
    try {
      return await authService.registerTrainee(trainee)
    } catch (error: any) {
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
//Register User AKA Staff
export const registerUser = createAsyncThunk<StaffResponseData, any>(
  "auth/registerUser",
  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user)
    } catch (error: any) {
      const message =
        (error.response.data.email
          ? error.response.data.email
          : error.response.data.phone_number[0]) || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const getTrainee = createAsyncThunk<TraineeResponseData, any>(
  "auth/getTrainee",
  async (phone_number, thunkAPI) => {
    try {
      return await authService.getTrainee(phone_number)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response && error.response.data.detail) || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: {
      isLoading: boolean
      isSuccess: boolean
      isError: boolean
      isRegisteringUserSuccess: boolean
      isRegisteringUserLoading: boolean
      isRegisteringTraineeSuccess: boolean
      isRegisteringTraineeLoading: boolean
      message: string
    }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isRegisteringUserSuccess = false
      state.isRegisteringUserLoading = false
      state.isRegisteringTraineeSuccess = false
      state.isRegisteringTraineeLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(LoginUser.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        LoginUser.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; user: any },
          action: { payload: PayloadAction<LoginData> }
        ) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        }
      )
      .addCase(
        LoginUser.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            user: null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.user = null
        }
      )
      .addCase(
        registerUser.pending,
        (state: { isRegisteringUserLoading: boolean }) => {
          state.isRegisteringUserLoading = true
        }
      )
      .addCase(
        registerUser.fulfilled,
        (state: {
          isRegisteringUserLoading: boolean
          isRegisteringUserSuccess: boolean
        }) => {
          state.isRegisteringUserLoading = false
          state.isRegisteringUserSuccess = true
        }
      )
      .addCase(
        registerUser.rejected,
        (
          state: {
            isRegisteringUserLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isRegisteringUserLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        registerTrainee.pending,
        (state: { isRegisteringTraineeLoading: boolean }) => {
          state.isRegisteringTraineeLoading = true
        }
      )
      .addCase(
        registerTrainee.fulfilled,
        (state: {
          isRegisteringTraineeLoading: boolean
          isRegisteringTraineeSuccess: boolean
        }) => {
          state.isRegisteringTraineeLoading = false
          state.isRegisteringTraineeSuccess = true
        }
      )
      .addCase(
        registerTrainee.rejected,
        (
          state: {
            isRegisteringTraineeLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isRegisteringTraineeLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        logout.fulfilled,
        (state: { isLoading: boolean; isSuccess: boolean; user: any }) => {
          state.user = null
        }
      )
      .addCase(getMe.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getMe.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; admin: any },
          action: { payload: PayloadAction<User> }
        ) => {
          state.isLoading = false
          state.isSuccess = true
          state.admin = action.payload
        }
      )
      .addCase(
        getMe.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            admin: User
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.admin = {
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
            is_staff: false,
            is_active: false,
            is_phone_verified: false,
            last_login: "",
            date_joined: "",
            is_trainee: false,
            password: "",
          }
        }
      )
      .addCase(forgetPassword.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        forgetPassword.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            forgetPasswordData: any
          },
          action: { payload: PayloadAction<LoginData> }
        ) => {
          state.isLoading = false
          state.isSuccess = true
          state.forgetPasswordData = action.payload
        }
      )
      .addCase(
        forgetPassword.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            forgetPasswordData: { email: string }
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.forgetPasswordData = { email: "" }
        }
      )
      .addCase(resetPassword.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        resetPassword.fulfilled,
        (state: { isLoading: boolean; isSuccess: boolean }) => {
          state.isLoading = false
          state.isSuccess = true
        }
      )
      .addCase(
        resetPassword.rejected,
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
        getTrainee.pending,
        (state: { isLoading: boolean; isUpdateAccountPending: boolean }) => {
          state.isLoading = true
          state.isUpdateAccountPending = true
        }
      )
      .addCase(
        getTrainee.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            trainee: any
            isUpdateAccountPending: boolean
          },
          action: { payload: PayloadAction<TraineeResponseData> }
        ) => {
          state.isLoading = false
          state.trainee = action.payload
          state.isUpdateAccountPending = false
        }
      )
      .addCase(
        getTrainee.rejected,
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
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
