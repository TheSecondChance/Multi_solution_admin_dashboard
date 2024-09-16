// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import DataAnalytics from "@/components/DataAnalytics"
import StatusCard from "@/components/StatusCard"
import RecentRegisteration from "@/components/tables/trainee/RecentTraineeRegisteration"
import { getTraineePaymentList } from "@/features/finance/financeSlice"
import {
  getApprovedTrainees,
  getPendingTrainees,
  getRejectedTrainees,
} from "@/features/statistics/StatisticsSlice"
import Layout from "@/layout/Layout"
import { useEffect } from "react"
import { Link } from "react-router-dom"
const Overview = () => {
  const { traineePaymentList } = useAppSelector((state) => state.finance)
  const { pendingTrainees, approvedTrainees, rejectedTrainees } =
    useAppSelector((state) => state.statistics)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTraineePaymentList({}))
  }, [dispatch])

  useEffect(() => {
    dispatch(getPendingTrainees(traineePaymentList.count))
    dispatch(getApprovedTrainees(traineePaymentList.count))
    dispatch(getRejectedTrainees(traineePaymentList.count))
  }, [dispatch, traineePaymentList.count])
  return (
    <Layout>
      <div>
        {traineePaymentList?.results && (
          <div className='container mx-auto w-full '>
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 border border-[#E6EDFF] rounded-xl'>
              <div>
                <Link to='/trainees/total'>
                  <div className='dark:hidden'>
                    <StatusCard
                      title='Total Trainees'
                      totalNumber={traineePaymentList?.count}
                      icon='text-[#1E477B]'
                    />
                  </div>
                </Link>

                <Link to='/trainees/total'>
                  <div className='hidden dark:block'>
                    <StatusCard
                      title='Total Trainees'
                      totalNumber={traineePaymentList?.count}
                      icon='text-[#1E477B]'
                    />
                  </div>
                </Link>
              </div>
              <div className=''>
                <Link to='/trainees/pending'>
                  <div className='dark:hidden'>
                    <StatusCard
                      title='Pending Trainees'
                      totalNumber={pendingTrainees?.results.length}
                      icon='text-[#F7B12F]'
                    />
                  </div>
                </Link>
                <Link to='/trainees/pending'>
                  <div className='hidden dark:block'>
                    <StatusCard
                      title='Pending Trainees'
                      totalNumber={pendingTrainees?.results.length}
                      icon='text-[#F7B12F]'
                    />
                  </div>
                </Link>
              </div>
              <div>
                <Link to='/trainees/approved'>
                  <div className='dark:hidden'>
                    <StatusCard
                      title='Approved Trainees'
                      totalNumber={approvedTrainees?.results.length}
                      icon='text-[#00B69B]'
                    />
                  </div>
                </Link>
                <Link to='/trainees/approved'>
                  <div className='hidden dark:block'>
                    <StatusCard
                      title='Approved Trainees'
                      totalNumber={approvedTrainees?.results.length}
                      icon='text-[#00B69B]'
                    />
                  </div>
                </Link>
              </div>
              <div>
                <Link to='/trainees/rejected'>
                  <div className='dark:hidden'>
                    <StatusCard
                      title='Rejected Trainees'
                      totalNumber={rejectedTrainees?.results.length}
                      icon='text-[#EF3826]'
                      isRightBorderDisabled={true}
                    />
                  </div>
                </Link>
                <Link to='/trainees/rejected'>
                  <div className='hidden dark:block'>
                    <StatusCard
                      title='Rejected Trainees'
                      totalNumber={rejectedTrainees?.results.length}
                      icon='text-[#EF3826]'
                      isRightBorderDisabled={true}
                    />
                  </div>
                </Link>
              </div>
            </div>
            <DataAnalytics />
            <RecentRegisteration title='Recent Registeration' />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Overview
