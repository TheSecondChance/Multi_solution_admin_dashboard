import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getEnrolledUsers, reset } from "@/features/enrollment/enrollmentSlice"
import { getEnrolledUsersStat } from "@/features/statistics/StatisticsSlice"
import { useEffect, useState } from "react"
import DoughnutChart from "./charts/DoughnutChart"
import LineChartComponent from "./charts/LineChartComponent"

const DataAnalytics = () => {
  const [trainingCounts, setTrainingCounts] = useState([])
  const { enrolledUsers, isSuccess } = useAppSelector(
    (state) => state.enrollment
  )
  const { enrollmentStat } = useAppSelector((state) => state.statistics)
  console.log("users", enrolledUsers.results)
  console.log("stat", enrollmentStat.results)
  const dispatch = useAppDispatch()
  const { count } = enrolledUsers
  useEffect(() => {
    const page = 1
    dispatch(getEnrolledUsers(page))

    return () => {
      dispatch(reset())
    }
  }, [dispatch])
  useEffect(() => {
    if (count) {
      dispatch(getEnrolledUsersStat(count))
    }

    return () => {
      dispatch(reset())
    }
  }, [count, dispatch, isSuccess])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function countTrainingTypes(data: any[]) {
    const trainingMap: { [key: string]: number } = {}

    data?.forEach((result: { training_type: string | number }) => {
      if (trainingMap[result.training_type]) {
        trainingMap[result.training_type]++
      } else {
        trainingMap[result.training_type] = 1
      }
    })

    return Object.keys(trainingMap).map((name) => ({
      name,
      value: trainingMap[name],
    }))
  }

  useEffect(() => {
    const counts = countTrainingTypes(enrollmentStat?.results)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    setTrainingCounts(counts)
  }, [enrollmentStat])
  return (
    <div className='flex items-center overflow-hidden max-w-full justify-between gap-2 flex-col xl:flex-row w-full mt-10'>
      <div className='w-full xl:w-[65%] max-w-full  min-h-80 lg:min-h-full h-full flex-wrap border border-[#E6EDFF] rounded-lg p-4  '>
        <h1 className='text-2xl font-semibold leading-7'>Trainees</h1>
        <LineChartComponent apiData={enrollmentStat.results} />
      </div>

      <div className=' hidden dark:flex border w-full  flex-col items-center justify-center xl:w-[35%] lg:min-h-full h-full  py-8  border-[#E6EDFF] rounded-lg '>
        <h1 className='text-lg md:text-2xl font-semibold leading-7 '>
          Trainees
        </h1>

        <DoughnutChart data={trainingCounts} color='#FFFFFF' />
      </div>
      <div className=' flex dark:hidden border w-full  flex-col items-center justify-center xl:w-[35%] min-h-80 h-full py-8  border-[#E6EDFF] rounded-lg'>
        <h1 className='text-lg md:text-2xl font-semibold leading-7 '>
          Trainees
        </h1>

        <DoughnutChart data={trainingCounts} color='#000000' />
      </div>
    </div>
  )
}

export default DataAnalytics
