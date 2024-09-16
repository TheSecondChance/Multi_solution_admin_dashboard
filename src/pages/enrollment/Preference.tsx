import Layout from "@/layout/Layout"
import PreferenceTable from "../../components/tables/enrollment/PreferenceTable"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import DoughnutChart from "@/components/charts/DoughnutChart"
import { Preference } from "@/features/account/accountService"
import { getPreferenceStat } from "@/features/statistics/StatisticsSlice"

const Preferences = () => {
  const dispatch = useAppDispatch()
  const [bankAccountCounts, setBankAccountCounts] = useState([])
  const [languageCounts, setLanguageCounts] = useState([])
  const { preferences, isSuccess } = useAppSelector((state) => state.account)
  const { preferenceStat } = useAppSelector((state) => state.statistics)
  const { count } = preferences

  const [visualizationData, setVisualizationData] = useState<Preference[]>()
  function countBankAccounts(data: Preference[]) {
    const bankAccountsMap: { [key: string]: number } = {}

    data?.forEach((result: { bank: string | number }) => {
      if (bankAccountsMap[result.bank]) {
        bankAccountsMap[result.bank]++
      } else {
        bankAccountsMap[result.bank] = 1
      }
    })

    return Object.keys(bankAccountsMap).map((name) => ({
      name,
      value: bankAccountsMap[name],
    }))
  }
  function countLanguages(data: Preference[]) {
    const languagesMap: { [key: string]: number } = {}

    data?.forEach((result: { language: string | number }) => {
      if (languagesMap[result.language]) {
        languagesMap[result.language]++
      } else {
        languagesMap[result.language] = 1
      }
    })

    return Object.keys(languagesMap).map((name) => ({
      name,
      value: languagesMap[name],
    }))
  }

  useEffect(() => {
    const countBanks = countBankAccounts(visualizationData!)
    const countLanguage = countLanguages(visualizationData!)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    setBankAccountCounts(countBanks)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    setLanguageCounts(countLanguage)
  }, [preferences, visualizationData])

  useEffect(() => {
    dispatch(getPreferenceStat(count))
  }, [count, dispatch])
  useEffect(() => {
    if (isSuccess) {
      setVisualizationData(preferenceStat.results)
    }
  }, [isSuccess, preferenceStat.results])
  return (
    <Layout>
      <div className='container mx-auto w-full '>
        <div className='container flex flex-col lg:flex-row items-center mx-auto px-4 py-8 md:px-6 lg:px-8  border rounded-md'>
          <div className='flex flex-col border-b  md:border-b-0 md:border-r items-center justify-center w-full dark:hidden'>
            <p>Bank accounts Preference</p>
            <DoughnutChart data={bankAccountCounts} color='#000000' />
          </div>
          <div className='flex flex-col items-center justify-center w-full dark:hidden'>
            <p>Languages Preference</p>
            <DoughnutChart data={languageCounts} color='#000000' />
          </div>
          <div className='hidden dark:flex flex-col border-b  md:border-b-0  md:border-r items-center justify-center w-full'>
            <p>Bank accounts Preference</p>
            <DoughnutChart data={bankAccountCounts} color='#FFFFFF' />
          </div>
          <div className='hidden dark:flex flex-col items-center justify-center w-full'>
            <p>Languages Preference</p>
            <DoughnutChart data={languageCounts} color='#FFFFFF' />
          </div>
        </div>
        <PreferenceTable title='Preferences' />
      </div>
    </Layout>
  )
}

export default Preferences
