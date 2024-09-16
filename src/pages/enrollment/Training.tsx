import RecentEnrollment from "@/components/tables/enrollment/RecentEnrollment"

import Layout from "@/layout/Layout"
import ManageTraining from "../../components/ManageTraining"

const Training = () => {
  return (
    <Layout>
      <div className='container mx-auto w-full '>
        <ManageTraining />
        <RecentEnrollment title='Enrolled Users' />
      </div>
    </Layout>
  )
}

export default Training
