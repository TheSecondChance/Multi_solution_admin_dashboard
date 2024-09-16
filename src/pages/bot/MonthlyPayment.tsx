import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getTrainee } from "@/features/auth/authSlice"
import { getTrainingList } from "@/features/enrollment/enrollmentSlice"
import { MonthlyPayerUserUpdate } from "@/features/finance/financeService"
import {
  createMonthlyPayerUser,
  getBankAccountsList,
  reset,
} from "@/features/finance/financeSlice"
import BotLayout from "@/layout/BotLayout"
import { formatToEthiopianDate } from "@/utils/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { EthDateTime } from "ethiopian-calendar-date-converter"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { CircleLoader } from "react-spinners"
import { z } from "zod"

export default function MonthlyPayment() {
  const { t } = useTranslation()
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),

    lastName: z.string().optional(),
    middleName: z.string().optional(),
    phoneNumber: z
      .string()
      .min(12, {
        message: "Phone Number must be 12 characters.",
      })
      .max(12, {
        message: "Phone Number must be 12 characters.",
      }),

    trainingType: z.string(),
    transactionNumber: z.string().min(2, {
      message: t(`fill_transaction`),
    }),
    bankOption: z.string().min(1, {
      message: t(`fill_bank_option`),
    }),

    month: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      phoneNumber: "",

      trainingType: "",
      transactionNumber: "",
      month: "",
      bankOption: "",
    },
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { trainings } = useAppSelector((state) => state.enrollment)
  const { trainee } = useAppSelector((state) => state.auth)
  const {
    bankAccounts,
    isError,
    message,
    transactionData,
    isCreatingMonthlyPayerUserLoading,
    isCreatingMonthlyPayerUserSuccess,
  } = useAppSelector((state) => state.finance)
  const { phone_number } = useParams()
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (message.includes("found")) navigate("/bot/not-found")
  }, [message, navigate])
  useEffect(() => {
    dispatch(getTrainee(phone_number!))

    dispatch(reset())
  }, [phone_number, dispatch])
  useEffect(() => {
    form.reset({
      firstName: trainee?.first_name,
      lastName: trainee?.last_name,
      middleName: trainee?.middle_name ? trainee?.middle_name : "",
      phoneNumber: trainee?.phone_number,
      bankOption: trainee?.account_options?.toString(),
      trainingType: trainee?.training?.toString(),

      month: EthDateTime.now().toDateWithDayString(),
    })
  }, [
    form,
    trainee?.account_options,
    trainee?.first_name,
    trainee?.last_name,
    trainee?.middle_name,
    trainee?.phone_number,
    trainee?.training,
    transactionData,
  ])

  useEffect(() => {
    if (isCreatingMonthlyPayerUserSuccess) {
      toast.success(t("You've updated your informations Successfully."))
      navigate(`/bot/success/monthly-payment/invoice/${trainee?.phone_number}`)
    }
  }, [isCreatingMonthlyPayerUserSuccess, navigate, t, trainee?.phone_number])
  useEffect(() => {
    dispatch(getBankAccountsList())
    dispatch(getTrainingList())
    dispatch(reset())
  }, [dispatch, t])
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: MonthlyPayerUserUpdate = {
      trans_num: values.transactionNumber,

      created_at: values.month,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: trainee?.id,

      account_options: Number.parseInt(values.bankOption),
    }

    dispatch(createMonthlyPayerUser(data))
  }
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop as string),
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paramsValue = params.lng
  return (
    <BotLayout>
      <h1 className='text-center font-bold  text-[#202224] text-base leading-5'>
        {t("monthly_payment")}
      </h1>

      <Form {...form}>
        <div className=' flex items-center justify-center w-full  my-10'>
          <div className='flex flex-col  w-full'>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full   py-10 md:rounded-tl-3xl md:rounded-bl-3xl '>
              <div className='flex flex-col space-y-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel> {t("first_name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("first_name")}
                          disabled
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='middleName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel> {t("middle_name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("middle_name")}
                          disabled
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel> {t("last_name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("last_name")}
                          disabled
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel> {t("phone_no")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("phone_no")}
                          disabled
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='trainingType'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel> {t("trainings")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        disabled>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("choose_training")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='text-[#263238] dark:text-white'>
                          {trainings?.map((training) => (
                            <SelectItem
                              value={training.id.toString()}
                              key={training.id}>
                              {t(training.training)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='transactionNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("transaction_no")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("transaction_no")}
                          className='border-[#D8D8D8] bg-[#F8FAFC] py-5'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='bankOption'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("bank_options")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("bank_options")}
                              className='text-[#263238] bg-transparent dark:text-white'
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='text-[#263238] dark:text-white'>
                          {bankAccounts?.map((bank) => (
                            <SelectItem
                              value={bank.id.toString()}
                              key={bank.id}>
                              {t(`${bank.bank_name}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='month'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("month")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("month")}
                          className='border-[#D8D8D8] bg-[#F8FAFC] py-5 hidden'
                          {...field}
                          disabled
                          value={field.value}
                        />
                      </FormControl>
                      <FormDescription className='text-primary font-medium py-4 text-base leading-7 text-[#1E477B] flex gap-1 '>
                        {paramsValue == "am" || paramsValue == "or" ? (
                          <div className='flex items-center gap-1 w-full'>
                            <span className='w-ull'>{t("paying_for")} </span>
                            <span>
                              {" "}
                              {t(
                                formatToEthiopianDate(
                                  new Date()
                                ).month.toString()
                              )}
                            </span>
                            <span>
                              {formatToEthiopianDate(new Date()).date}
                            </span>
                            <span>
                              {" "}
                              {formatToEthiopianDate(new Date()).year}
                            </span>
                          </div>
                        ) : (
                          EthDateTime.now().toDateWithDayString()
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='w-full'>
                  <Button
                    type='submit'
                    className='mt-10 w-full ml-auto  bg-[#1e477b] h-[50px] my-3 flex items-center justify-center rounded-sm cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out  hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#f7b12f] before:to-[#f7b12f] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-sm hover:before:left-0 text-[#fff]'
                    disabled={isCreatingMonthlyPayerUserLoading}>
                    {isCreatingMonthlyPayerUserLoading ? (
                      <CircleLoader
                        color='#ffffff'
                        size={30}
                        loading={isCreatingMonthlyPayerUserLoading}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                      />
                    ) : (
                      <div>{t("Complete")}</div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Form>
    </BotLayout>
  )
}
