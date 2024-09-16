import { Toaster } from "react-hot-toast"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import RegisterStaff from "./components/forms/auth/RegisterStaff"
import UpdateStaff from "./components/forms/update/UpdateStaff"
import UpdateTrainee from "./components/forms/update/UpdateTrainee"
import ApprovedTrainees from "./components/tables/filter/ApprovedTrainees"
import PendingTrainees from "./components/tables/filter/PendingTrainees"
import RejectedTrainees from "./components/tables/filter/RejectedTrainees"
import TotalTrainees from "./components/tables/filter/TotalTrainees"
import Confirm from "./pages/Confirm"
import Login from "./pages/Login"
import Overview from "./pages/Overview"
import Register from "./pages/Register"
import Setting from "./pages/Setting"
import Utils from "./pages/Utils"
import Staff from "./pages/account/Staff"
import Trainee from "./pages/account/Trainee"
import NewPassword from "./pages/auth/NewPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Enrollment from "./pages/enrollment/Enrollment"
import Preference from "./pages/enrollment/Preference"
import Training from "./pages/enrollment/Training"
import FixedFinance from "./pages/finance/FixedFinance"
import MonthlyFinance from "./pages/finance/MonthlyFinance"
import PrivateRoutes from "./utils/PrivateRoutes"
import MonthlySchedule from "./components/MonthlySchedule"
import UpdateMonthlySchedule from "./components/finance/UpdateMonthlySchedule"
import Notfound from "./pages/Notfound"
import { ConfirmOTP } from "./components/ConfirmOTP"
import UpdateEnrollment from "./components/forms/update/UpdateEnrollment"
// bot
import RegisterTraineeOnBot from "./pages/bot/RegisterTrainee"
import ContactUsOnBot from "./pages/bot/ContactUs"
import Success from "./pages/bot/Success"
import UpdateAccountOnBot from "./pages/bot/UpdateAccount"
import Invoice from "./pages/bot/Invoice"
import MonthlyInvoice from "./pages/bot/MonthlyInvoice"
import MonthlyPayment from "./pages/bot/MonthlyPayment"
import NotFoundOnBot from "./pages/bot/Notfound"
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Bot Routes */}
          <Route
            path='/bot/account/register-trainee'
            element={<RegisterTraineeOnBot />}
          />
          <Route path='/bot/contact-us' element={<ContactUsOnBot />} />
          <Route path='/bot/success/:phone_number' element={<Success />} />
          <Route
            path='/bot/account/update/:phone_number'
            element={<UpdateAccountOnBot />}
          />
          <Route path='/bot/not-found' element={<NotFoundOnBot />} />
          <Route
            path='/bot/success/invoice/:phone_number'
            element={<Invoice />}
          />
          <Route
            path='/bot/payment/monthly-payment/:phone_number'
            element={<MonthlyPayment />}
          />
          <Route
            path='/bot/success/monthly-payment/invoice/:phone_number'
            element={<MonthlyInvoice />}
          />
          <Route path='/auth/reset-password' element={<ResetPassword />} />
          <Route
            path='/auth/reset-password/new-password'
            element={<NewPassword />}
          />
          <Route
            path='/auth/reset-password/confirm-otp'
            element={<ConfirmOTP />}
          />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Overview />} />

            <Route
              path='/trainees/pending'
              element={<PendingTrainees title='Pending Trainees' />}
            />
            <Route
              path='/trainees/approved'
              element={<ApprovedTrainees title='Approved Trainees' />}
            />
            <Route
              path='/trainees/rejected'
              element={<RejectedTrainees title='Rejected Trainees' />}
            />
            <Route path='/trainees/total' element={<TotalTrainees />} />
            <Route path='/' element={<Overview />} />
            <Route path='/dashboard/account' element={<Register />} />
            <Route
              path='/dashboard/account/trainee/register'
              element={<Register />}
            />
            <Route
              path='/dashboard/account/staff/register'
              element={<RegisterStaff />}
            />
            <Route path='/dashboard/account/trainee' element={<Trainee />} />
            <Route
              path='/dashboard/account/update/trainee/:id'
              element={<UpdateTrainee />}
            />
            <Route
              path='/dashboard/enrollment/update/trainee/:id/:trainingId'
              element={<UpdateEnrollment />}
            />
            <Route
              path='/dashboard/account/update/user/:id'
              element={<UpdateStaff />}
            />
            <Route path='/dashboard/account/users' element={<Staff />} />
            <Route path='/setting' element={<Setting />} />
            <Route
              path='/dashboard/enrollment/manage-trainings'
              element={<Training />}
            />
            <Route
              path='/dashboard/enrollment/manage-preferences'
              element={<Preference />}
            />

            <Route path='/dashboard/enrollment' element={<Enrollment />} />
            <Route path='/dashboard/finance/fixed' element={<FixedFinance />} />
            <Route
              path='/dashboard/finance/monthly'
              element={<MonthlyFinance />}
            />
            <Route
              path='/dashboard/finance/monthly-schedule'
              element={<MonthlySchedule />}
            />
            <Route
              path='/dashboard/finance/update/monthly-schedule/:id'
              element={<UpdateMonthlySchedule />}
            />
            <Route path='/dashboard/utils' element={<Utils />} />
            <Route path='*' element={<Notfound />} />
          </Route>
          <Route path='*' element={<NotFoundOnBot />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "rgba(242, 244, 252, 0.7)",
              borderLeft: "4px solid #00BD40 ",
              borderRadius: "4px 0px 0px 4px",
              color: "#2B2B2B",
              paddingBlock: "20px",
            },
          },
          error: {
            style: {
              background: "rgba(242, 244, 252, 0.7)",
              borderLeft: "4px solid #FF1A1A ",
              borderRadius: "4px 0px 0px 4px",
              color: "#2B2B2B",
              paddingBlock: "20px",
            },
          },
        }}
        position='top-right'
      />
    </>
  )
}

export default App
