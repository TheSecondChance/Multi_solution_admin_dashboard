import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import toast from "react-hot-toast"
import { getBankAccountsList } from "@/features/finance/financeSlice"
import { getTrainingList } from "@/features/enrollment/enrollmentSlice"
import { registerTrainee, reset } from "@/features/auth/authSlice"
import { TraineeData } from "@/features/auth/authService"
import { CircleLoader } from "react-spinners"
import { normalizePhoneNumber } from "@/utils/utils"
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Please, insert first name.",
  }),
  middleName: z.string().min(2, {
    message: "Please, insert middle name.",
  }),
  lastName: z.string().min(2, {
    message: "Please, insert last name.",
  }),
  phoneNumber: z.string().regex(/^(2519\d{8}|2517\d{8}|07\d{8}|09\d{8})$/, {
    message:
      "Invalid phone number. It must start with 2519,2517,07 or 09 followed by 8 digits",
  }),
  email: z.string().optional(),
  gender: z.string().min(1, { message: "Please select gender" }),
  country: z.string().min(1, { message: "Please select country" }),
  city: z.string().min(1, { message: "Please select city" }),
  trainingType: z.string().min(1, {
    message: "Please select the training type from the given alternatives.",
  }),
  bankOptions: z.string().min(1, {
    message: "Please select the bank option  from the given alternatives.",
  }),
  transactionNumber: z.string().min(3, {
    message: "Transaction number must be atleast 3 characters",
  }),
})
const RegisterTrainee = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "M",
      country: "ethiopia",
      city: "",
      trainingType: "",
      bankOptions: "",
      transactionNumber: "",
    },
  })
  const dispatch = useAppDispatch()
  const { bankAccounts } = useAppSelector((state) => state.finance)
  const { trainings } = useAppSelector((state) => state.enrollment)

  const {
    isError,
    isSuccess,
    isRegisteringTraineeLoading,
    isRegisteringTraineeSuccess,
    message,
  } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isRegisteringTraineeSuccess) {
      toast.success("You've successfully registered the trainee.")
    }
  }, [isRegisteringTraineeSuccess])

  useEffect(() => {
    dispatch(getBankAccountsList())
    dispatch(getTrainingList())

    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [isError, isSuccess, isRegisteringTraineeSuccess, message, dispatch])
  useEffect(() => {
    if (isRegisteringTraineeSuccess) {
      form.reset({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: "M",
        country: "ethiopia",
        city: "",
        trainingType: "",
        bankOptions: "",
        transactionNumber: "",
      })
    }
  }, [form, isRegisteringTraineeSuccess])
  const [isHidden, setIsHidden] = useState(true)

  function onSubmit(values: z.infer<typeof formSchema>) {
    const traineeData: TraineeData = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      phone_number: normalizePhoneNumber(values.phoneNumber),
      email: values.email,
      gender: values.gender,
      account_options: parseInt(values?.bankOptions || "") || undefined,
      training: parseInt(values?.trainingType || "") || undefined,
      trans_num: values.transactionNumber,
      country: values.country || "",
      city: values.city || "",
    }
    dispatch(registerTrainee(traineeData))
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 container mx-auto w-full max-w-4xl border p-2 md:p-8 rounded-md'>
        <h1 className='text-primary text-center lg:text-2xl text-lg md:text-xl font-semibold leading-7'>
          Register Trainee
        </h1>
        <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='First Name' {...field} />
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
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input placeholder='Middle Name' {...field} />
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Last Name' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='Phone Number' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' type='email' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='M'>Male</SelectItem>
                    <SelectItem value='F'>Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Country' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ethiopia'>Ethiopia</SelectItem>
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
              <FormItem className='w-full'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder='City' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-8 w-full'>
          <FormField
            control={form.control}
            name='trainingType'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Training type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Training Type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='text-[#263238] dark:text-white'>
                    {trainings?.map((training) => (
                      <SelectItem
                        value={training.id.toString()}
                        key={training.id}>
                        {training.training}
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
            name='bankOptions'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Bank Options</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Bank Options' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='text-[#263238] dark:text-white'>
                    {bankAccounts?.map((bank) => (
                      <SelectItem value={bank.id.toString()} key={bank.id}>
                        {bank.bank_name} {`(${bank.account_number})`}
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
              <FormItem className='w-full'>
                <FormLabel>Transaction Number</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      className='pr-10'
                      id='password'
                      placeholder='Transaction Number'
                      {...field}
                      type={isHidden ? "password" : "text"}
                    />
                    <div
                      onClick={() => setIsHidden(!isHidden)}
                      className='absolute cursor-pointer right-2 top-1/2 -translate-y-1/2'>
                      {isHidden ? (
                        <Eye className='h-5 w-5' />
                      ) : (
                        <EyeOff className='h-5 w-5' />
                      )}
                      <span className='sr-only'>
                        Toggle password visibility
                      </span>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex items-center'>
          <Button
            className='ml-auto w-[150px] bg-[#1E477B] hover:bg-[#1E477B]/85'
            type='submit'
            disabled={isRegisteringTraineeLoading}>
            {" "}
            {isRegisteringTraineeLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isRegisteringTraineeLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <p>Register</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default RegisterTrainee
