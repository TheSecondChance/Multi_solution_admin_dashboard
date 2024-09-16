import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { EnrolledUsers } from "../enrollment/enrollmentService"
import statisticsService from "./statisticsService"
import { PreferenceLists } from "../account/accountService"
import { FinanceResponse } from "../finance/financeService"

interface StatisticsState {
  enrollmentStat:
    | EnrolledUsers
    | {
        count: 0
        next: null
        previous: null
        results: []
      }
  preferenceStat:
    | PreferenceLists
    | {
        count: 0
        next: null
        previous: null
        results: []
      }

  pendingTrainees:
    | FinanceResponse
    | {
        count: 0
        next: null
        previous: null
        results: []
      }

  approvedTrainees:
    | FinanceResponse
    | {
        count: 0
        next: null
        previous: null
        results: []
      }
  rejectedTrainees:
    | FinanceResponse
    | {
        count: 0
        next: null
        previous: null
        results: []
      }
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string | unknown
}

const initialState: StatisticsState = {
  enrollmentStat: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  preferenceStat: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  approvedTrainees: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  pendingTrainees: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  rejectedTrainees: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getEnrolledUsersStat = createAsyncThunk(
  "statistics/getEnrolledUsersStat",
  async (page_size: number, thunkAPI) => {
    try {
      return await statisticsService.getEnrolledUsersStat(page_size)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const getPendingTrainees = createAsyncThunk(
  "statistics/getPendingTrainees",
  async (page_size: number, thunkAPI) => {
    try {
      return await statisticsService.getPendingTrainees(page_size)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const getRejectedTrainees = createAsyncThunk(
  "statistics/getRejectedTrainees",
  async (page_size: number, thunkAPI) => {
    try {
      return await statisticsService.getRejectedTrainees(page_size)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const getApprovedTrainees = createAsyncThunk(
  "statistics/getApprovedTrainees",
  async (page_size: number, thunkAPI) => {
    try {
      return await statisticsService.getApprovedTrainees(page_size)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const getPreferenceStat = createAsyncThunk(
  "statistics/getPreferenceStat",
  async (page_size: number, thunkAPI) => {
    try {
      return await statisticsService.getPreferencesStat(page_size)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    reset: (state: {
      isLoading: boolean
      isSuccess: boolean
      isError: boolean
    }) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<StatisticsState>) => {
    builder
      .addCase(getEnrolledUsersStat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getEnrolledUsersStat.fulfilled,
        (state, action: PayloadAction<EnrolledUsers>) => {
          state.isLoading = false
          state.isSuccess = true
          state.enrollmentStat = action.payload
        }
      )
      .addCase(
        getEnrolledUsersStat.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(getPreferenceStat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getPreferenceStat.fulfilled,
        (state, action: PayloadAction<PreferenceLists>) => {
          state.isLoading = false
          state.isSuccess = true
          state.preferenceStat = action.payload
        }
      )
      .addCase(
        getPreferenceStat.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(getPendingTrainees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getPendingTrainees.fulfilled,
        (state, action: PayloadAction<FinanceResponse>) => {
          state.isLoading = false
          state.isSuccess = true
          state.pendingTrainees = action.payload
        }
      )
      .addCase(
        getPendingTrainees.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(getApprovedTrainees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getApprovedTrainees.fulfilled,
        (state, action: PayloadAction<FinanceResponse>) => {
          state.isLoading = false
          state.isSuccess = true
          state.approvedTrainees = action.payload
        }
      )
      .addCase(
        getApprovedTrainees.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isError = true
          state.message = action.payload
        }
      )
      .addCase(getRejectedTrainees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getRejectedTrainees.fulfilled,
        (state, action: PayloadAction<FinanceResponse>) => {
          state.isLoading = false
          state.isSuccess = true
          state.rejectedTrainees = action.payload
        }
      )
      .addCase(
        getRejectedTrainees.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isError = true
          state.message = action.payload
        }
      )
  },
})
export const { reset } = statisticsSlice.actions
export default statisticsSlice.reducer
