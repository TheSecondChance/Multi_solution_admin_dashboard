import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import enrollmentReducer from "@/features/enrollment/enrollmentSlice"
import financeReducer from "@/features/finance/financeSlice"
import accountReducer from "@/features/account/accountSlice"
import utilsReducer from "@/features/utils/utilsSlice"
import statisticsReducer from "@/features/statistics/StatisticsSlice"
import contactReducer from "@/features/contact/contactSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    enrollment: enrollmentReducer,
    finance: financeReducer,
    account: accountReducer,
    utils: utilsReducer,
    statistics: statisticsReducer,
    contact: contactReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
