/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import contactService, {
  ContactUsData,
  ContactResponseData,
} from "./contactService"

// Get user from localStorage

interface ContactData {
  ContactData: ContactUsData | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: ContactData = {
  ContactData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const contactUs = createAsyncThunk<ContactResponseData, any>(
  "auth/contactUs",
  async (data, thunkAPI) => {
    try {
      return await contactService.contactUs(data)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response &&
          error.response.data.detail &&
          error.response.data.message) ||
        error.detail ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const contactSlice = createSlice({
  name: "contact",
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
      .addCase(contactUs.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        contactUs.fulfilled,
        (state: {
          isLoading: boolean
          isSuccess: boolean
          ContactData: any
        }) => {
          state.isLoading = false
          state.isSuccess = true
        }
      )
      .addCase(
        contactUs.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            ContactData: null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.ContactData = null
        }
      )
  },
})

export const { reset } = contactSlice.actions
export default contactSlice.reducer
