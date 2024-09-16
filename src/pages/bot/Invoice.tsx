import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/features/finance/financeService"
import { getTraineePaymentData, reset } from "@/features/finance/financeSlice"
import { formatToEthiopianDate, usePrint } from "@/utils/utils"
import { format, parseISO } from "date-fns"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router-dom"

const Invoice = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paramsValue = params.lng
  const { t } = useTranslation()
  const navigate = useNavigate()
  const componentRef = useRef<HTMLDivElement | null>(null)
  const handlePrint = usePrint(componentRef)
  const { phone_number } = useParams()
  const dispatch = useAppDispatch()
  const { isError, transactionData, message } = useAppSelector(
    (state) => state.finance
  )
  const assignColor = (status: Transaction) => {
    if (status.is_completed == true) return "bg-[#CCF0EB] text-[#00B69B] "
    else if (status.is_completed == false && status.is_rejected == false)
      return "bg-[#FDEFD5] text-[#F7B12F]"
    else return "bg-[#FCD7D4] text-[#EF3826]"
  }

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
  console.log("Transaction data", transactionData)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (message.includes("found")) navigate("/bot/not-found")
  }, [isError, message, navigate, transactionData?.length])
  useEffect(() => {
    dispatch(getTraineePaymentData(phone_number!))
    dispatch(reset())
  }, [dispatch, phone_number])
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <>
      {transactionData?.length == 1 && (
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
              <img src='/small-logo.svg' alt='logo' />
              <p>
                {t("invoice")} # {transactionData[0]?.id}
              </p>
            </div>
            <div className='flex flex-col w-full space-y-10 p-5'>
              <div className='flex items-center justify-between'>
                <p>{t("bill_to")}</p>
                <p>{t("owner_name")}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("date")}</p>
                <p>
                  {" "}
                  {paramsValue == "am" || paramsValue == "or" ? (
                    <div className='flex items-center gap-1'>
                      <span>
                        {" "}
                        {t(
                          formatToEthiopianDate(
                            new Date(transactionData[0]?.created_at)
                          ).month.toString()
                        )}
                      </span>
                      <span>
                        {
                          formatToEthiopianDate(
                            new Date(transactionData[0]?.created_at)
                          ).date
                        }
                      </span>
                      <span>
                        {" "}
                        {
                          formatToEthiopianDate(
                            new Date(transactionData[0]?.created_at)
                          ).year
                        }
                      </span>
                    </div>
                  ) : (
                    formatDateWithoutTime(transactionData[0]?.created_at)
                  )}{" "}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("full_name")}</p>
                <p className='text-sm font-normal capitalize'>
                  {transactionData[0]?.first_name +
                    " " +
                    transactionData[0]?.middle_name +
                    " " +
                    " " +
                    transactionData[0]?.last_name}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("phone_no")}</p>
                <p className='text-sm font-normal'>
                  {transactionData[0]?.phone_number}
                </p>
              </div>
            </div>
            <div className='py-10 w-full px-5 flex flex-col bg-[#1E477B] text-white space-y-3'>
              <div className='flex items-center justify-between'>
                <p>{t("training")}</p>
                <p>{t(transactionData[0]?.training)}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("transaction_no")}</p>
                <p>{transactionData[0]?.trans_num}</p>
              </div>
              <div className='flex items-center justify-between'>
                <p>{t("bank")}</p>
                <p>{t(transactionData[0]?.bank_name)}</p>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center space-y-4 mt-5'>
              <p
                className={`${assignColor(
                  transactionData[0]
                )} font-normal py-1 px-3 text-center`}>
                {checkTransactionStatus(transactionData[0]!)}
              </p>
              <Button className='bg-[#F7B12F] hover:bg-[#F7B12F]/85 py-1 px-3 rounded-md text-sm flex items-center gap-1'>
                <img src='/pdf-icon.svg' alt='Pdf icon' className='w-5' />
                <p
                  className='text-white font-normal text-sm'
                  onClick={handlePrint}>
                  Print
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

export default Invoice
