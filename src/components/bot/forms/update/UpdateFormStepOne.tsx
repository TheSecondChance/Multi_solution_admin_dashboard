import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Dispatch, SetStateAction, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getTrainee, reset } from "@/features/auth/authSlice"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { FormDataTwoState } from "@/pages/bot/UpdateAccount"
import { useTranslation } from "react-i18next"

interface FormDataOneState {
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  email?: string
  gender: string
}

type StepsDataType = {
  stpesCount: number[]
  currentStep: number
}

type SetStepOneDataAction = Dispatch<SetStateAction<FormDataOneState>>
type SetStepTwoDataAction = Dispatch<SetStateAction<FormDataTwoState>>
type setStepType = (newValue: StepsDataType) => void

interface Props {
  setStepOneFormData: SetStepOneDataAction
  setStep: setStepType
  stepOneFormData: FormDataOneState
  setStepTwoFormData: SetStepTwoDataAction
}
const UpdateFormStepOne: React.FC<Props> = ({
  setStepOneFormData,
  setStepTwoFormData,
  setStep,
  stepOneFormData,
}) => {
  console.log("step one form data", stepOneFormData)
  const { t } = useTranslation()
  const formSchemaOne = z.object({
    firstName: z.string().min(2, {
      message: t(`fill_first_name`),
    }),
    middleName: z.string().min(2, {
      message: t(`fill_middle_name`),
    }),
    lastName: z.string().min(2, {
      message: t(`fill_last_name`),
    }),
    phoneNumber: z.string().regex(/^(2519\d{8}|2517\d{8}|07\d{8}|09\d{8})$/, {
      message: t(`invalid_phone`),
    }),
    email: z.string().optional(),
    gender: z.string().min(1, {
      message: t(`fill_gender`),
    }),
  })

  const { phone_number } = useParams()

  const dispatch = useAppDispatch()
  const { isError, isSuccess, trainee, message } = useAppSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()
  useEffect(() => {
    if (message.includes("found")) navigate("/bot/not-found")
  }, [message, navigate])
  const formOne = useForm<z.infer<typeof formSchemaOne>>({
    resolver: zodResolver(formSchemaOne),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
    },
  })
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStepOneFormData((prevStepOneData) => ({
      ...prevStepOneData,

      firstName: trainee?.first_name || "",
      lastName: trainee?.last_name || "",
      middleName: trainee?.middle_name,
      email: trainee?.email,
      phoneNumber: trainee?.phone_number || "",
      gender: trainee?.gender || "M",
    }))

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStepTwoFormData((prevStepTwoData) => ({
      ...prevStepTwoData,

      country: trainee?.country || "",
      city: trainee?.city || "",
      bankOption:
        trainee?.account_options != null
          ? trainee?.account_options?.toString()
          : "",
      transactionNumber: trainee?.trans_num || "",
      training: trainee?.training != null ? trainee?.training.toString() : "",
    }))

    formOne.setValue("firstName", stepOneFormData.firstName)
    formOne.setValue("middleName", stepOneFormData.middleName)
    formOne.setValue("email", stepOneFormData.email)
    formOne.setValue("lastName", stepOneFormData.lastName)
    formOne.setValue("phoneNumber", stepOneFormData.phoneNumber)
    formOne.setValue("gender", stepOneFormData.gender)
  }, [
    stepOneFormData.email,
    stepOneFormData.firstName,
    stepOneFormData.gender,
    stepOneFormData.lastName,
    stepOneFormData.middleName,
    stepOneFormData.phoneNumber,
    formOne,
    trainee?.email,
    trainee?.first_name,
    trainee?.gender,
    trainee?.last_name,
    trainee?.middle_name,
    trainee?.phone_number,
    setStepOneFormData,
    setStepTwoFormData,
    trainee?.country,
    trainee?.city,
    trainee?.account_options,
    trainee?.trans_num,
    trainee?.training,
  ])
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    dispatch(getTrainee(phone_number))

    dispatch(reset())
  }, [isSuccess, phone_number, dispatch])
  function onNext(values: z.infer<typeof formSchemaOne>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStepOneFormData((prevStepOneData) => ({
      ...prevStepOneData,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
    }))

    setStep({
      stpesCount: [1, 2],
      currentStep: 2,
    })
  }
  return (
    <Form {...formOne}>
      <form
        onSubmit={formOne.handleSubmit(onNext)}
        className='flex flex-col space-y-4 w-full'>
        <div className='flex flex-col space-y-4 mb-2   md:justify-between gap-2'>
          <FormField
            control={formOne.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                  {t("first_name")}
                </FormLabel>
                <FormControl>
                  <Input
                    className='text-[#263238] '
                    placeholder={t("first_name")}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formOne.control}
            name='middleName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                  {t("middle_name")}
                </FormLabel>
                <FormControl>
                  <Input
                    className='text-[#263238] bg-transparent dark:text-white'
                    placeholder={t("middle_name")}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formOne.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                  {t("last_name")}
                </FormLabel>
                <FormControl>
                  <Input
                    className='text-[#263238] '
                    placeholder={t("last_name")}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formOne.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                    {t("Gender")}
                  </FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("Gender")}
                        className=' placeholder:text-white  '
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='text-[#263238]  dark:text-white'>
                    <SelectItem value='M'>{t("Male")}</SelectItem>
                    <SelectItem value='F'>{t("Female")}</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col space-y-4   md:justify-between gap-2 mb-10'>
          <FormField
            control={formOne.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                  {t("email")}
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    className='text-[#263238] bg-transparent dark:text-white'
                    placeholder={t("email")}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formOne.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                  {t("phone_no")}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className='text-[#263238] '
                    placeholder={t("phone_no")}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full '>
          <Button
            type='submit'
            className='bg-[#1E477B] w-full hover:bg-[#F7B12F] transition-all rounded-lg mt-10'>
            {t("next")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateFormStepOne
