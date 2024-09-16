import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import { TraineeData } from "@/features/auth/authService"
import { registerTrainee, reset } from "@/features/auth/authSlice"
import { getTrainingList } from "@/features/enrollment/enrollmentSlice"
import { getBankAccountsList } from "@/features/finance/financeSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { z } from "zod"
import { StepOneDataState } from "./FormStepOne"
import { CircleLoader } from "react-spinners"
 
const FormStepTwo = ({ stepOneData }: { stepOneData: StepOneDataState }) => {
  const { t } = useTranslation()
   const formSchema = z.object({
     country: z.string().min(1, {
       message: t(`fill_country`),
     }),
     city: z.string().min(1, {
       message: t(`fill_city`),
     }),
     training: z.string().min(1, {
       message: t(`fill_training`),
     }),
     bankOption: z.string().min(1, {
       message: t(`fill_bank_option`),
     }),

     transactionNumber: z.string().min(2, {
       message: t(`fill_transaction`),
     }),
   })
  const dispatch = useAppDispatch()
  const { bankAccounts } = useAppSelector((state) => state.finance)
  const { trainings } = useAppSelector((state) => state.enrollment)

  const {
    isError,
    isRegisteringTraineeSuccess,
    isRegisteringTraineeLoading,
    message,
  } = useAppSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getBankAccountsList())
    dispatch(getTrainingList())

    if (isError) {
      toast.error(t(`${message}`))
    }

    if (isRegisteringTraineeSuccess) {
      toast.success("You're registered  Successfully.")
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, isRegisteringTraineeSuccess, message, dispatch, t])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "Ethiopia",
      city: "",
      bankOption: "",
      transactionNumber: "",
      training: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const traineeData: TraineeData = {
      first_name: stepOneData.firstName,
      middle_name: stepOneData.middleName,
      last_name: stepOneData.lastName,
      phone_number: stepOneData.phoneNumber,
      email: stepOneData.email,
      gender: stepOneData.gender,
      account_options: parseInt(values?.bankOption || "") || undefined,
      training: parseInt(values?.training || "") || undefined,
      trans_num: values.transactionNumber,
      country: values.country || "",
      city: values.city || "",
    }
    console.log(values)
    dispatch(registerTrainee(traineeData))
  }

  return (
    <Form {...form}>
      <div className='flex flex-col  w-full'>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full   py-10 md:rounded-tl-3xl md:rounded-bl-3xl '>
          <div className='flex flex-col space-y-4 gap-2'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                      {t("country")}
                    </FormLabel>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("country")}
                          className=' placeholder:text-white  '
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='text-[#263238]  dark:text-white'>
                      <SelectItem value='Ethiopia'>{t("Ethiopia")}</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                    {t("city")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='text-[#263238] '
                      placeholder={t("city")}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='training'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                    {t("trainings")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("choose_training")}
                          className='text-[#263238] bg-transparent dark:text-white'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='text-[#263238] dark:text-white'>
                      {trainings?.map((training) => (
                        <SelectItem
                          value={training.id.toString()}
                          key={training.id}>
                          {t(`${training.training}`)}
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
              name='bankOption'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                    {t("bank_options")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
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
                        <SelectItem value={bank.id.toString()} key={bank.id}>
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
              name='transactionNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                    {t("transaction_no")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='text-[#263238] '
                      placeholder={t("transaction_no")}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='w-full'>
              <Button
                type='submit'
                className='btn-gradient mt-10 w-full hover:bg-[#F7B12F] bg-[#1E477B] rounded-lg  text-white ml-auto'>
                {isRegisteringTraineeLoading ? (
                  <CircleLoader
                    color='#ffffff'
                    size={30}
                    loading={isRegisteringTraineeLoading}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                  />
                ) : (
                  <p className='cursor-pointer'> {t("Complete")}</p>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default FormStepTwo
