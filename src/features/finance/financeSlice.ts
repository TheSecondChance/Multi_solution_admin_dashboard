import {
  FinanceResponse,
  MonthlyPayerUserData,
  MonthlyPaymentCycle,
  TraineeStatus,
  Transaction,
} from "./financeService"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import financeService, {
  BankAccount,
  GetBankAccountsResponseData,
} from "./financeService"

interface FinanceState {
  bankAccounts: GetBankAccountsResponseData[] | null
  monthlyPayerUserData?: MonthlyPayerUserData
  transactionData: Transaction[] | []
  traineePaymentList:
    | FinanceResponse
    | {
        count: 0
        next: null
        previous: null
        results: []
      }
  monthlyPaymentList:
    | FinanceResponse
    | {
        count: 0
        next: null
        previous: null
        results: []
      }
  isError: boolean
  monthlyPaymentCycleList:
    | MonthlyPaymentCycle[]
    | [
        {
          id: 0
          opening_date: ""
          closing_date: ""
          is_active: true
        }
      ]
  monthlyPaymentCycle:
    | MonthlyPaymentCycle
    | {
        id: 0
        opening_date: ""
        closing_date: ""
        is_active: true
      }

  isSuccess: boolean
  isLoading: boolean
  isUpdatingLoading: boolean
  isUpdatingSuccess: boolean
  isRejectingLoading: boolean
  isRejectingSuccess: boolean
  isSettingToPendingLoading: boolean
  isSettingToPendingSuccess: boolean
  isAddingBankAccountLoading: boolean
  isAddingBankAccountSuccess: boolean
  isUpdatingBankAccountLoading: boolean
  isUpdatingBankAccountSuccess: boolean
  isDeletingBankAccountLoading: boolean
  isDeletingBankAccountSuccess: boolean
  isCreatingScheduleSuccess: boolean
  isCreatingScheduleLoading: boolean
  message: string
  isDeletingLoading: boolean
  isDeletingSuccess: boolean
  isCreatingMonthlyPayerUserSuccess: boolean
  isCreatingMonthlyPayerUserLoading: boolean
}

const initialState: FinanceState = {
  bankAccounts: [],
  monthlyPayerUserData: undefined,
  transactionData: [],
  traineePaymentList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },

  monthlyPaymentList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  monthlyPaymentCycleList: [
    {
      id: 0,
      opening_date: "",
      closing_date: "",
      is_active: true,
    },
  ],
  monthlyPaymentCycle: {
    id: 0,
    opening_date: "",
    closing_date: "",
    is_active: true,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdatingLoading: false,
  isUpdatingSuccess: false,
  isRejectingLoading: false,
  isRejectingSuccess: false,
  isSettingToPendingLoading: false,
  isSettingToPendingSuccess: false,
  isAddingBankAccountLoading: false,
  isCreatingScheduleLoading: false,
  isCreatingScheduleSuccess: false,
  isAddingBankAccountSuccess: false,
  isUpdatingBankAccountLoading: false,
  isUpdatingBankAccountSuccess: false,
  isDeletingBankAccountLoading: false,
  isDeletingBankAccountSuccess: false,
  isDeletingLoading: false,
  isDeletingSuccess: false,
  isCreatingMonthlyPayerUserLoading: false,
  isCreatingMonthlyPayerUserSuccess: false,

  message: "",
}

// Get bank accounts list
export const getBankAccountsList = createAsyncThunk(
  "finance/getBankAccounts",
  async (_, thunkAPI) => {
    try {
      return await financeService.getBankAccountList()
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
// Get TraineePaymentList
export const getTraineePaymentList = createAsyncThunk(
  "finance/getTraineePaymentList",
  async (
    {
      page,
      filter,
    }: {
      page?: number
      filter?: { isCompleted?: string; isRejected?: string }
    },
    thunkAPI
  ) => {
    try {
      return await financeService.getTraineePaymentList(
        page,

        filter
      )
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
// Get Monthly payer Trainees PaymentList
export const getMonthlyPayerTraineesPaymentList = createAsyncThunk(
  "finance/getMonthlyPayerTraineesPaymentList",
  async (
    {
      page,
      filter,
    }: { page: number; filter?: { isCompleted?: string; isRejected?: string } },
    thunkAPI
  ) => {
    try {
      return await financeService.getMonthlyPayerTraineesPaymentList(
        page,
        filter
      )
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
// Create Bank Account
export const createBankAccount = createAsyncThunk(
  "finance/createBankAccount",
  async (bankAccountData: BankAccount, thunkAPI) => {
    try {
      return await financeService.createBank(bankAccountData)
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
// Update Bank Account
export const updateBankAccount = createAsyncThunk(
  "finance/updateBankAccount",
  async (bankAccountData: GetBankAccountsResponseData, thunkAPI) => {
    try {
      return await financeService.updateBank(bankAccountData)
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
// Delete Bank Account
export const deleteBankAccount = createAsyncThunk(
  "finance/deleteBankAccount",
  async (id: number, thunkAPI) => {
    try {
      return await financeService.deleteBank(id)
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
// Approve Trainee has completed payment
export const approveTrainee = createAsyncThunk(
  "finance/approveTrainee",
  async (paymentData: TraineeStatus, thunkAPI) => {
    try {
      return await financeService.approveTrainee(paymentData)
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
// Reject Trainee  payment
export const rejectTrainee = createAsyncThunk(
  "finance/rejectTrainee",
  async (paymentData: TraineeStatus, thunkAPI) => {
    try {
      return await financeService.rejectTrainee(paymentData)
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
// set to pending trainee payment : is_completed==false && is_rejected==false
export const setTraineeToPending = createAsyncThunk(
  "finance/setTraineeToPending",
  async (paymentData: TraineeStatus, thunkAPI) => {
    try {
      return await financeService.setTraineeToPending(paymentData)
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
// Approve Trainee has completed payment --> For monthly payer trainees
export const approveMonthlyPayerTrainee = createAsyncThunk(
  "finance/approveMonthlyPayerTrainee",
  async (paymentData: TraineeStatus, thunkAPI) => {
    try {
      return await financeService.approveMonthlyPayerTrainee(paymentData)
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
// Reject Trainee  payment --> For monthly payer trainees
export const rejectMonthlyPayerTrainee = createAsyncThunk(
  "finance/rejectMonthlyPayerTrainee",
  async (paymentData: TraineeStatus, thunkAPI) => {
    try {
      return await financeService.rejectMonthlyPayerTrainee(paymentData)
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
// set to pending trainee payment --> For monthly payer trainees : is_completed==false && is_rejected==false
export const setMonthlyPayerTraineeToPending = createAsyncThunk(
  "finance/setMonthlyPayerTraineeToPending",
  async (paymentData: TraineeStatus, thunkAPI) => {
    try {
      return await financeService.setMonthlyPayerTraineeToPending(paymentData)
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
// Get Monthly payment cycle list
export const getMonthlyPaymentCycleList = createAsyncThunk(
  "finance/getMonthlyPaymentCycleList",
  async (_, thunkAPI) => {
    try {
      return await financeService.getMonthlyPaymentCycleList()
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
// Get Monthly payment cycle
export const getMonthlyPaymentCycle = createAsyncThunk(
  "finance/getMonthlyPaymentCycle",
  async (id: number, thunkAPI) => {
    try {
      return await financeService.getMonthlyPaymentCycle(id)
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
export const updateMonthlyPaymentCycle = createAsyncThunk(
  "finance/updateMonthlyPaymentCycle",
  async (data: MonthlyPaymentCycle, thunkAPI) => {
    const { id } = data
    const updateData = {
      opening_date: data.opening_date,
      closing_date: data.closing_date,
      is_active: data.is_active,
    }
    try {
      return await financeService.updateMonthlyPaymentCycle(updateData, id)
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
export const createMonthlyPaymentCycle = createAsyncThunk(
  "finance/createMonthlyPaymentCycle",
  async (
    data: { opening_date: Date; closing_date: Date; is_active: boolean },
    thunkAPI
  ) => {
    try {
      return await financeService.createMonthlyPaymentCycle(data)
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
// Delete Monthly Payment Cycle
export const deleteMonthlyPaymentCycle = createAsyncThunk(
  "finance/deleteMonthlyPaymentCycle",
  async (id: number, thunkAPI) => {
    try {
      return await financeService.deleteMonthlyPaymentCycle(id)
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
// Get Trainee payment data
export const getTraineePaymentData = createAsyncThunk(
  "finance/getTraineePyamentData",
  async (phone_number: string, thunkAPI) => {
    try {
      return await financeService.getTraineePaymentData(phone_number)
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
) // Get monthly payer trainee payment data
export const getMonthlyPayerTraineePaymentData = createAsyncThunk(
  "finance/getMonthlyPayerUserUserPaymentData",
  async (phone_number: string, thunkAPI) => {
    try {
      return await financeService.getMonthlyPayerTraineePaymentData(
        phone_number
      )
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
// create monthly payer user
export const createMonthlyPayerUser = createAsyncThunk(
  "finance/createMonthlyPayerUser",
  async (userData: any, thunkAPI) => {
    try {
      const paymentData = {
        trans_num: userData.trans_num,
        user: userData.user,
        account_options: userData.account_options,
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await financeService.createMonthlyPayerUser(paymentData)
    } catch (error: any) {
      console.log("Error ", error)
      const message =
        (error.response.data.trans_num
          ? error.response.data.trans_num
          : error.response.data.phone_number[0]) || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    reset: (state: {
      isLoading: boolean
      isSuccess: boolean
      isError: boolean
      isUpdatingSuccess: boolean
      isUpdatingLoading: boolean
      isRejectingSuccess: boolean
      isRejectingLoading: boolean
      isSettingToPendingSuccess: boolean
      isSettingToPendingLoading: boolean
      isAddingBankAccountLoading: boolean
      isAddingBankAccountSuccess: boolean
      isUpdatingBankAccountLoading: boolean
      isUpdatingBankAccountSuccess: boolean
      isDeletingBankAccountLoading: boolean
      isDeletingBankAccountSuccess: boolean
      isCreatingScheduleLoading: boolean
      isCreatingScheduleSuccess: boolean
      isDeletingSuccess: boolean
      isDeletingLoading: boolean
      isCreatingMonthlyPayerUserLoading: boolean
      isCreatingMonthlyPayerUserSuccess: boolean
      message: string
    }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.isUpdatingLoading = false
      state.isUpdatingSuccess = false
      state.isRejectingLoading = false
      state.isRejectingSuccess = false
      state.isSettingToPendingLoading = false
      state.isSettingToPendingSuccess = false
      state.isAddingBankAccountLoading = false
      state.isAddingBankAccountSuccess = false
      state.isUpdatingBankAccountLoading = false
      state.isUpdatingBankAccountSuccess = false
      state.isDeletingBankAccountLoading = false
      state.isDeletingBankAccountSuccess = false
      state.isCreatingScheduleLoading = false
      state.isCreatingScheduleSuccess = false
      state.isDeletingLoading = false
      state.isDeletingSuccess = false
      state.isCreatingMonthlyPayerUserLoading = false
      state.isCreatingMonthlyPayerUserSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getBankAccountsList.pending, (state: { isLoading: boolean }) => {
        state.isLoading = true
      })
      .addCase(
        getBankAccountsList.fulfilled,
        (
          state: { isLoading: boolean; isSuccess: boolean; bankAccounts: any },
          action: { payload: PayloadAction<GetBankAccountsResponseData[]> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.bankAccounts = action.payload
        }
      )
      .addCase(
        getBankAccountsList.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            bankAccounts: []
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.bankAccounts = []
        }
      )
      .addCase(
        getTraineePaymentList.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getTraineePaymentList.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            traineePaymentList: any
          },
          action: { payload: PayloadAction<any> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.traineePaymentList = action.payload
        }
      )
      .addCase(
        getTraineePaymentList.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            traineePaymentList: []
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.traineePaymentList = []
        }
      )
      .addCase(
        createBankAccount.pending,
        (state: {
          isLoading: boolean
          isAddingBankAccountLoading: boolean
        }) => {
          state.isLoading = true
          state.isAddingBankAccountLoading = true
        }
      )
      .addCase(
        createBankAccount.fulfilled,
        (state: {
          isLoading: boolean
          isSuccess: boolean
          isAddingBankAccountLoading: boolean
          isAddingBankAccountSuccess: boolean
        }) => {
          state.isLoading = false
          state.isSuccess = true
          state.isAddingBankAccountLoading = false
          state.isAddingBankAccountSuccess = true
        }
      )
      .addCase(
        createBankAccount.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            isAddingBankAccountLoading: boolean
            message: string
            bankAccounts: []
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.isAddingBankAccountLoading = false
          state.bankAccounts = []
        }
      )
      .addCase(
        updateBankAccount.pending,
        (state: { isUpdatingBankAccountLoading: boolean }) => {
          state.isUpdatingBankAccountLoading = true
        }
      )
      .addCase(
        updateBankAccount.fulfilled,
        (state: {
          isUpdatingBankAccountLoading: boolean
          isUpdatingBankAccountSuccess: boolean
        }) => {
          state.isUpdatingBankAccountLoading = false
          state.isUpdatingBankAccountSuccess = true
        }
      )
      .addCase(
        updateBankAccount.rejected,
        (
          state: {
            isError: boolean
            isDeletingBankAccountLoading: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isError = true
          state.message = action.payload as string
          state.isDeletingBankAccountLoading = false
        }
      )
      .addCase(
        deleteBankAccount.pending,
        (state: { isDeletingBankAccountLoading: boolean }) => {
          state.isDeletingBankAccountLoading = true
        }
      )
      .addCase(
        deleteBankAccount.fulfilled,
        (state: {
          isDeletingBankAccountLoading: boolean
          isDeletingBankAccountSuccess: boolean
        }) => {
          state.isDeletingBankAccountLoading = false
          state.isDeletingBankAccountSuccess = true
        }
      )
      .addCase(
        deleteBankAccount.rejected,
        (
          state: {
            isError: boolean
            isDeletingBankAccountLoading: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isError = true
          state.message = action.payload as string
          state.isDeletingBankAccountLoading = false
        }
      )
      .addCase(
        approveTrainee.pending,
        (state: { isUpdatingLoading: boolean }) => {
          state.isUpdatingLoading = true
        }
      )
      .addCase(
        approveTrainee.fulfilled,
        (state: { isUpdatingLoading: boolean; isUpdatingSuccess: boolean }) => {
          state.isUpdatingLoading = false
          state.isUpdatingSuccess = true
        }
      )
      .addCase(
        approveTrainee.rejected,
        (
          state: {
            isUpdatingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdatingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        rejectTrainee.pending,
        (state: { isRejectingLoading: boolean }) => {
          state.isRejectingLoading = true
        }
      )
      .addCase(
        rejectTrainee.fulfilled,
        (state: {
          isRejectingLoading: boolean
          isRejectingSuccess: boolean
        }) => {
          state.isRejectingLoading = false
          state.isRejectingSuccess = true
        }
      )
      .addCase(
        rejectTrainee.rejected,
        (
          state: {
            isRejectingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isRejectingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        setTraineeToPending.pending,
        (state: { isSettingToPendingLoading: boolean }) => {
          state.isSettingToPendingLoading = true
        }
      )
      .addCase(
        setTraineeToPending.fulfilled,
        (state: {
          isSettingToPendingLoading: boolean
          isSettingToPendingSuccess: boolean
        }) => {
          state.isSettingToPendingLoading = false
          state.isSettingToPendingSuccess = true
        }
      )
      .addCase(
        setTraineeToPending.rejected,
        (
          state: {
            isSettingToPendingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isSettingToPendingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        getMonthlyPayerTraineesPaymentList.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getMonthlyPayerTraineesPaymentList.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            monthlyPaymentList: any
          },
          action: { payload: PayloadAction<any> }
        ) => {
          state.isLoading = false
          state.isSuccess = true
          console.log("monthly payment ", action.payload)
          state.monthlyPaymentList = action.payload
          console.log("monthly  ", state.monthlyPaymentList)
        }
      )
      .addCase(
        getMonthlyPayerTraineesPaymentList.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            monthlyPaymentList: FinanceResponse
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.monthlyPaymentList = {
            count: 0,
            next: null,
            previous: null,
            results: [],
          }
        }
      )
      .addCase(
        approveMonthlyPayerTrainee.pending,
        (state: { isUpdatingLoading: boolean }) => {
          state.isUpdatingLoading = true
        }
      )
      .addCase(
        approveMonthlyPayerTrainee.fulfilled,
        (state: { isUpdatingLoading: boolean; isUpdatingSuccess: boolean }) => {
          state.isUpdatingLoading = false
          state.isUpdatingSuccess = true
        }
      )
      .addCase(
        approveMonthlyPayerTrainee.rejected,
        (
          state: {
            isUpdatingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdatingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        rejectMonthlyPayerTrainee.pending,
        (state: { isRejectingLoading: boolean }) => {
          state.isRejectingLoading = true
        }
      )
      .addCase(
        rejectMonthlyPayerTrainee.fulfilled,
        (state: {
          isRejectingLoading: boolean
          isRejectingSuccess: boolean
        }) => {
          state.isRejectingLoading = false
          state.isRejectingSuccess = true
        }
      )
      .addCase(
        rejectMonthlyPayerTrainee.rejected,
        (
          state: {
            isRejectingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isRejectingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        setMonthlyPayerTraineeToPending.pending,
        (state: { isSettingToPendingLoading: boolean }) => {
          state.isSettingToPendingLoading = true
        }
      )
      .addCase(
        setMonthlyPayerTraineeToPending.fulfilled,
        (state: {
          isSettingToPendingLoading: boolean
          isSettingToPendingSuccess: boolean
        }) => {
          state.isSettingToPendingLoading = false
          state.isSettingToPendingSuccess = true
        }
      )
      .addCase(
        setMonthlyPayerTraineeToPending.rejected,
        (
          state: {
            isSettingToPendingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isSettingToPendingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        getMonthlyPaymentCycleList.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getMonthlyPaymentCycleList.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            monthlyPaymentCycleList: any
          },
          action: { payload: PayloadAction<any> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.monthlyPaymentCycleList = action.payload
        }
      )
      .addCase(
        getMonthlyPaymentCycleList.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            monthlyPaymentCycleList: MonthlyPaymentCycle
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.monthlyPaymentCycleList = {
            id: 0,
            opening_date: new Date(),
            closing_date: new Date(),
            is_active: true,
          }
        }
      )
      .addCase(
        getMonthlyPaymentCycle.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getMonthlyPaymentCycle.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            monthlyPaymentCycle: any
          },
          action: { payload: PayloadAction<any> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.monthlyPaymentCycle = action.payload
        }
      )
      .addCase(
        getMonthlyPaymentCycle.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            monthlyPaymentCycleList: MonthlyPaymentCycle
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.monthlyPaymentCycleList = {
            id: 0,
            opening_date: new Date(),
            closing_date: new Date(),
            is_active: true,
          }
        }
      )
      .addCase(
        updateMonthlyPaymentCycle.pending,
        (state: { isUpdatingLoading: boolean }) => {
          state.isUpdatingLoading = true
        }
      )
      .addCase(
        updateMonthlyPaymentCycle.fulfilled,
        (state: { isUpdatingLoading: boolean; isUpdatingSuccess: boolean }) => {
          state.isUpdatingLoading = false
          state.isUpdatingSuccess = true
        }
      )
      .addCase(
        updateMonthlyPaymentCycle.rejected,
        (
          state: {
            isUpdatingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isUpdatingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        createMonthlyPaymentCycle.pending,
        (state: { isCreatingScheduleLoading: boolean }) => {
          state.isCreatingScheduleLoading = true
        }
      )
      .addCase(
        createMonthlyPaymentCycle.fulfilled,
        (state: {
          isCreatingScheduleLoading: boolean
          isCreatingScheduleSuccess: boolean
        }) => {
          state.isCreatingScheduleLoading = false
          state.isCreatingScheduleSuccess = true
        }
      )
      .addCase(
        createMonthlyPaymentCycle.rejected,
        (
          state: {
            isCreatingScheduleLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isCreatingScheduleLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        deleteMonthlyPaymentCycle.pending,
        (state: { isDeletingLoading: boolean }) => {
          state.isDeletingLoading = true
        }
      )
      .addCase(
        deleteMonthlyPaymentCycle.fulfilled,
        (state: { isDeletingLoading: boolean; isDeletingSuccess: boolean }) => {
          state.isDeletingLoading = false
          state.isDeletingSuccess = true
        }
      )
      .addCase(
        deleteMonthlyPaymentCycle.rejected,
        (
          state: {
            isDeletingLoading: boolean
            isError: boolean
            message: string
          },
          action: { payload: string }
        ) => {
          state.isDeletingLoading = false
          state.isError = true
          state.message = action.payload as string
        }
      )
      .addCase(
        getTraineePaymentData.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getTraineePaymentData.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            transactionData: any
          },
          action: { payload: PayloadAction<Transaction[]> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.transactionData = action.payload
        }
      )
      .addCase(
        getTraineePaymentData.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            transactionData: null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.transactionData = null
        }
      )
      .addCase(
        getMonthlyPayerTraineePaymentData.pending,
        (state: { isLoading: boolean }) => {
          state.isLoading = true
        }
      )
      .addCase(
        getMonthlyPayerTraineePaymentData.fulfilled,
        (
          state: {
            isLoading: boolean
            isSuccess: boolean
            transactionData: any
          },
          action: { payload: PayloadAction<Transaction> }
        ) => {
          state.isLoading = false
          state.isSuccess = true

          state.transactionData = action.payload
        }
      )
      .addCase(
        getMonthlyPayerTraineePaymentData.rejected,
        (
          state: {
            isLoading: boolean
            isError: boolean
            message: string
            transactionData: null
          },
          action: { payload: string }
        ) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload as string
          state.transactionData = null
        }
      )
      .addCase(
        createMonthlyPayerUser.pending,
        (state: { isCreatingMonthlyPayerUserLoading: boolean }) => {
          state.isCreatingMonthlyPayerUserLoading = true
        }
      )
      .addCase(
        createMonthlyPayerUser.fulfilled,
        (state: {
          isCreatingMonthlyPayerUserLoading: boolean
          isCreatingMonthlyPayerUserSuccess: boolean
        }) => {
          state.isCreatingMonthlyPayerUserLoading = false
          state.isCreatingMonthlyPayerUserSuccess = true
        }
      )
      .addCase(
        createMonthlyPayerUser.rejected,
        (
          state: {
            isCreatingMonthlyPayerUserLoading: boolean
            isError: boolean
            message: string
            monthlyPayerUserData: null
          },
          action: { payload: string }
        ) => {
          state.isCreatingMonthlyPayerUserLoading = false
          state.isError = true
          state.message = action.payload as string
          state.monthlyPayerUserData = null
        }
      )
  },
})

export const { reset } = financeSlice.actions
export default financeSlice.reducer
