/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import utilsService, { ContactForm } from "./utilsService"

interface UtilsState {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: UtilsState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createContact = createAsyncThunk<ContactForm, any>(
  "utils/createContact",
  async (data, thunkAPI) => {
    try {
      return await utilsService.createContact(data)
    } catch (error: any) {
      const message =
        (error.response && error.response.data.detail) || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const verifyOTP = createAsyncThunk<{ otp: string; email: string }, any>(
  "utils/verifyOTP",
  async (
    data: {
      otp: string
      email: string
    },
    thunkAPI
  ) => {
    try {
      return await utilsService.verifyOTP(data)
    } catch (error: any) {
      const message =
        (error.response && error.response.data.non_field_errors[0]) ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    reset: (state: {
      isLoading: boolean
      isSuccess: boolean
      isError: boolean
      message: string
    }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder: any) => {
    builder

      .addCase(createContact.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        createContact.fulfilled,
        (state: {
          isLoading: boolean
          isSuccess: boolean
          message: string
        }) => {
          state.isLoading = false
          state.isSuccess = true
        }
      )
      .addCase(
        createContact.rejected,
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
      .addCase(verifyOTP.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        verifyOTP.fulfilled,
        (state: {
          isLoading: boolean
          isSuccess: boolean
          message: string
        }) => {
          state.isLoading = false
          state.isSuccess = true
        }
      )
      .addCase(
        verifyOTP.rejected,
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

export const { reset } = utilsSlice.actions
export default utilsSlice.reducer
