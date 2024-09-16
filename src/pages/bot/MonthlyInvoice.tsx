import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/features/finance/financeService"
import {
  getMonthlyPayerTraineePaymentData,
  reset,
} from "@/features/finance/financeSlice"

import { format, parseISO } from "date-fns"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useReactToPrint } from "react-to-print"
import { formatToEthiopianDate } from "@/utils/utils"
const MonthlyInvoice = () => {
  const assignColor = (status: Transaction) => {
    if (status.is_completed == true) return "bg-[#CCF0EB] text-[#00B69B] "
    else if (status.is_completed == false && status.is_rejected == false)
      return "bg-[#FDEFD5] text-[#F7B12F]"
    else return "bg-[#FCD7D4] text-[#EF3826]"
  }
  const { t } = useTranslation()
  const componentRef = useRef()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handlePrint = useReactToPrint({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: () => componentRef.current,
  })
  const { phone_number } = useParams()
  const dispatch = useAppDispatch()
  const { isError, transactionData, message } = useAppSelector(
    (state) => state.finance
  )

  const navigate = useNavigate()
  useEffect(() => {
    if (message.includes("found")) navigate("/bot/not-found")
  }, [message, navigate])
  function checkTransactionStatus(transaction: Transaction): string {
    if (transaction?.is_completed) {
      return t("invoice_success")
    } else if (!transaction?.is_completed && !transaction?.is_rejected) {
      return t("invoice_pending")
    } else if (!transaction?.is_completed && transaction?.is_rejected) {
      return t("invoice_rejected")
    }
    return t("invoice_unknown")
  }

  function formatDateWithoutTime(isoDateTimeString: string) {
    const date = parseISO(isoDateTimeString)

    return format(date, "MMMM d yyyy")
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    dispatch(getMonthlyPayerTraineePaymentData(phone_number!))

    dispatch(reset())
  }, [phone_number, dispatch])

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paramsValue = params.lng

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <>
      {transactionData?.length > 0 && (
        <div
          className='max-w-lg mx-auto min-h-full py-16 px-4 !relative bg-linePattern bg-no-repeat bg-cover   '
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ref={componentRef}>
          <div className='  p-4 bg-white  flex flex-col w-full items-center'>
            <div className='pt-24 w-full flex flex-col items-center gap-4'>
              <img src='/logo-2.jpg' alt='Logo' className=' -mt-14 w-3/5 ' />
            </div>

            <div className='flex items-center justify-between bg-[#1E477B]/15 py-10 w-full px-5'>
              <img src='/small-logo.svg' alt='logo' className='w-1/2' />

              <p>
                {t("invoice")} #{" "}
                {transactionData[transactionData?.length - 1]?.id}
              </p>
            </div>
            <div className='flex flex-col w-full space-y-10 p-5'>
              <div className='flex items-center justify-between'>
                <p>{t("bill_to")}</p>
                <p>{t("owner_name")}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("date")}</p>

                <div>
                  {" "}
                  {paramsValue == "am" || paramsValue == "or" ? (
                    <div className='flex items-center gap-1'>
                      <span>
                        {" "}
                        {t(
                          formatToEthiopianDate(
                            new Date(
                              transactionData[
                                transactionData?.length - 1
                              ]?.created_at
                            )
                          ).month.toString()
                        )}
                      </span>
                      <span>
                        {
                          formatToEthiopianDate(
                            new Date(
                              transactionData[
                                transactionData?.length - 1
                              ]?.created_at
                            )
                          ).date
                        }
                      </span>
                      <span>
                        {" "}
                        {
                          formatToEthiopianDate(
                            new Date(
                              transactionData[
                                transactionData?.length - 1
                              ]?.created_at
                            )
                          ).year
                        }
                      </span>
                    </div>
                  ) : (
                    formatDateWithoutTime(
                      transactionData[transactionData?.length - 1]?.created_at
                    )
                  )}
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("full_name")}</p>
                <p className='text-sm font-normal capitalize'>
                  {transactionData[transactionData?.length - 1]?.first_name +
                    " " +
                    transactionData[transactionData?.length - 1]?.middle_name +
                    " " +
                    transactionData[transactionData?.length - 1]?.last_name}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("phone_no")}</p>
                <p className='text-sm font-normal'>
                  {transactionData[transactionData?.length - 1]?.phone_number}
                </p>
              </div>
            </div>
            <div className='py-10 w-full px-5 flex flex-col bg-[#1E477B] text-white space-y-3'>
              <div className='flex items-center justify-between'>
                <p>{t("training")}</p>
                <p>
                  {t(transactionData[transactionData?.length - 1]?.training)}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("transaction_no")}</p>
                <p>{transactionData[transactionData?.length - 1]?.trans_num}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("bank")}</p>
                <p>
                  {t(transactionData[transactionData?.length - 1]?.bank_name)}
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center space-y-4 mt-5'>
              <p
                className={`${assignColor(
                  transactionData[0]
                )} font-normal py-1 px-3 text-center`}>
                {checkTransactionStatus(
                  transactionData[transactionData?.length - 1]!
                )}
              </p>
              <Button className='bg-[#F7B12F] hover:bg-[#F7B12F]/85 py-1 px-3 rounded-md text-sm flex items-center gap-1'>
                <img src='/pdf-icon.svg' alt='Pdf icon' className='w-5' />
                <p
                  className='text-white font-normal text-sm'
                  onClick={handlePrint}>
                  {t("print")}
                </p>
              </Button>
            </div>
          </div>
          <img
            src='/top-oval.svg'
            alt='SVG'
            className='absolute top-0 right-0 -z-10'
          />
          <img
            src='/bottom-oval.svg'
            alt='SVG'
            className='absolute bottom-0 left-0 -z-10'
          />
        </div>
      )}
    </>
  )
}

export default MonthlyInvoice
