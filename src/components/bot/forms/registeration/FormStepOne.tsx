import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { useTranslation } from "react-i18next"
import { Dispatch, SetStateAction } from "react"
import { normalizePhoneNumber } from "@/utils/utils"

type StepsDataType = {
  stpesCount: number[]
  currentStep: number
}
export type StepOneDataState = {
  firstName: string
  lastName: string
  middleName: string
  phoneNumber: string
  email: string
  gender: string
}

type SetStepOneDataAction = Dispatch<SetStateAction<StepOneDataState>>
type setStepType = (newValue: StepsDataType) => void

interface Props {
  setStepOneData: SetStepOneDataAction
  setStep: setStepType
  stepOneData: FormDataOneState
  steps: StepsDataType
}
export interface FormDataOneState {
  firstName: string
  lastName: string
  middleName?: string
  phoneNumber: string
  email?: string
  gender: string
}

const FormStepOne: React.FC<Props> = ({
  setStepOneData,
  setStep,
  stepOneData,
}) => {
  const { t } = useTranslation()
  const FormOneSchema = z.object({
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
  const formOne = useForm<z.infer<typeof FormOneSchema>>({
    resolver: zodResolver(FormOneSchema),
    defaultValues: {
      firstName: stepOneData.firstName,
      middleName: stepOneData.middleName,
      lastName: stepOneData.lastName,
      phoneNumber: stepOneData.phoneNumber,
      email: stepOneData.email,
      gender: stepOneData.gender,
    },
  })

  function onNext(values: z.infer<typeof FormOneSchema>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setStepOneData((prevStepOneData) => ({
      ...prevStepOneData,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      email: values.email,
      phoneNumber: normalizePhoneNumber(values.phoneNumber),
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

export default FormStepOne
