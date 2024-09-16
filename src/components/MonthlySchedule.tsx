import Layout from "@/layout/Layout"

import PaymentSchedule from "./tables/finance/PaymentSchedule"
import CreateMonthlySchedule from "./tables/finance/CreateMonthlySchedule"

const MonthlySchedule = () => {
  return (
    <Layout>
      <CreateMonthlySchedule />
      <PaymentSchedule title='Payment Schedule' />
    </Layout>
  )
}

export default MonthlySchedule
