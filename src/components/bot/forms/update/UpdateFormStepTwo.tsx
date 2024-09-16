import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { reset, updateTrainee } from "@/features/account/accountSlice"
import { TraineeData } from "@/features/auth/authService"
import { getTrainingList } from "@/features/enrollment/enrollmentSlice"
import { getBankAccountsList } from "@/features/finance/financeSlice"
import { FormDataOneState, FormDataTwoState } from "@/pages/bot/UpdateAccount"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetStateAction, Dispatch, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { CircleLoader } from "react-spinners"
import { z } from "zod"

type SetStepTwoDataAction = Dispatch<SetStateAction<FormDataTwoState>>

interface Props {
  stepOneFormData: FormDataOneState
  setStepTwoFormData: SetStepTwoDataAction
  stepTwoFormData: FormDataTwoState
}
const UpdateFormStepTwo: React.FC<Props> = ({
  stepOneFormData,
  stepTwoFormData,
  setStepTwoFormData,
}) => {
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
    isUpdatingTraineeSuccess,

    message,
    isUpdatingTraineeLoading,
  } = useAppSelector((state) => state.account)

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getBankAccountsList())
    dispatch(getTrainingList())

    if (isError) {
      toast.error(message)
    }

    if (isUpdatingTraineeSuccess) {
      toast.success(t("You've updated your informations Successfully."))
    }
    if (isUpdatingTraineeSuccess) {
      navigate(`/bot/success/${stepOneFormData?.phoneNumber}`)
    }
    dispatch(reset())
  }, [
    isUpdatingTraineeSuccess,
    message,
    dispatch,
    t,
    isError,
    navigate,
    stepOneFormData?.phoneNumber,
  ])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "Ethiopia",
      city: stepTwoFormData?.city || "",
      bankOption:
        stepTwoFormData?.bankOption != null
          ? stepTwoFormData?.bankOption?.toString()
          : "",
      transactionNumber: stepTwoFormData?.transactionNumber || "",
      training:
        stepTwoFormData?.training != null
          ? stepTwoFormData?.training.toString()
          : "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStepTwoFormData((prevStepTwoData) => ({
      ...prevStepTwoData,

      country: values.country,
      city: values.city,
      bankOption: values.bankOption,
      transactionNumber: values.transactionNumber,
      training: values.training,
    }))
    const traineeData: TraineeData = {
      first_name: stepOneFormData.firstName,
      middle_name: stepOneFormData.middleName,
      last_name: stepOneFormData.lastName,
      phone_number: stepOneFormData.phoneNumber,
      email: stepOneFormData.email,
      gender: stepOneFormData.gender,
      account_options: parseInt(values?.bankOption || "") || undefined,
      training: parseInt(values?.training || "") || undefined,
      trans_num: values.transactionNumber,
      country: values.country || "",
      city: values.city || "",
      is_reg_complete: true,
    }
    // console.log("on Submitting", traineeData)
    dispatch(updateTrainee(traineeData))
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
                className='mt-10 w-full ml-auto  bg-[#1e477b] h-[50px] my-3 flex items-center justify-center rounded-sm cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out  hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#f7b12f] before:to-[#f7b12f] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-sm hover:before:left-0 text-[#fff]'>
                {isUpdatingTraineeLoading ? (
                  <CircleLoader
                    color='#ffffff'
                    size={30}
                    loading={isUpdatingTraineeLoading}
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
    </Form>
  )
}

export default UpdateFormStepTwo
