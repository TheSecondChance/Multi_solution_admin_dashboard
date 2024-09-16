import RecentEnrollment from "@/components/tables/enrollment/RecentEnrollment"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Layout from "@/layout/Layout"
import { Link } from "react-router-dom"
const enrollmentOverview = [
  {
    title: "Enrollments",
    subtitle: "Manage Trainees",
    path: "/dashboard/enrollment",
    bg: "enrollment-overview-card-1",
  },

  {
    title: "Trainings",
    subtitle: "Manage Trainings",
    path: "/dashboard/enrollment/manage-trainings",
    bg: "enrollment-overview-card-2",
  },
  {
    title: "Preferences",
    subtitle: "Manage Preferences",
    path: "/dashboard/enrollment/manage-preferences",
    bg: "enrollment-overview-card-3",
  },
]
const Enrollment = () => {
  return (
    <Layout>
      <div className='container mx-auto w-full '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {enrollmentOverview?.map((enrollment) => (
            <Link to={enrollment.path} key={enrollment.path}>
              <Card className={`${enrollment.bg} dark:border-transparent`}>
                <CardHeader className='dark:bg-teritary '>
                  <div className='!flex items-center justify-between w-full'>
                    <div className='flex gap-2'>
                      <div>
                        <CardTitle className='capitalize text-white font-bold leading-6 text-xl md:text-2xl'>
                          {enrollment.title}
                        </CardTitle>
                      </div>{" "}
                    </div>
                    <div></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='font-normal text-white leading-6 text-sm md:text-base'>
                    {enrollment.subtitle}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <RecentEnrollment title='Enrolled users' />
      </div>
    </Layout>
  )
}

export default Enrollment
