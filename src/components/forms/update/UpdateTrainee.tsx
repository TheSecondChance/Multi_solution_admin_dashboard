import { useAppDispatch, useAppSelector } from "@/app/hooks"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TraineeUpdateData } from "@/features/account/accountService"
import { getTraineeById, updateTrainee } from "@/features/account/accountSlice"
import { reset } from "@/features/auth/authSlice"
import { getTrainingList } from "@/features/enrollment/enrollmentSlice"
import { getBankAccountsList } from "@/features/finance/financeSlice"
import Layout from "@/layout/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { CircleLoader } from "react-spinners"
import { z } from "zod"
import { Button } from "../../ui/button"
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  middleName: z.string().min(2, {
    message: "Middle Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  phoneNumber: z
    .string()
    .min(12, {
      message: "Phone Number must be 12 characters.",
    })
    .max(12, {
      message: "Phone Number must be 12 characters.",
    }),
  email: z.string().optional(),
  gender: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  trainingType: z.string(),
  bankOptions: z.string(),
  transactionNumber: z.string(),
})
const UpdateTrainee = () => {
  const {
    isError,
    isSuccess,
    trainee,
    isUpdatingTraineeLoading,
    isUpdatingTraineeSuccess,
    message,
  } = useAppSelector((state) => state.account)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      country: "ethiopia",
      city: "",
      bankOptions: "",
      transactionNumber: "",
      trainingType: "",
    },
  })
  const dispatch = useAppDispatch()
  const { bankAccounts } = useAppSelector((state) => state.finance)
  const { trainings } = useAppSelector((state) => state.enrollment)

  const { id } = useParams()
  //fetch trainee dat
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    form.reset({
      firstName: trainee?.first_name,
      middleName: trainee?.middle_name,
      lastName: trainee?.last_name,
      phoneNumber: trainee?.phone_number,
      country: trainee?.country,
      city: trainee?.city == null ? "" : trainee?.city,
      gender: trainee?.gender,
      email: trainee?.email,
      trainingType: trainee?.training?.toString(),
      transactionNumber: trainee?.tans_num,
      bankOptions: trainee?.account_options?.toString(),
    })
  }, [
    form,
    trainee?.account_options,
    trainee?.city,
    trainee?.country,
    trainee?.email,
    trainee?.first_name,
    trainee?.last_name,
    trainee?.middle_name,
    trainee?.phone_number,
    trainee?.training,
    trainee?.trans_num,
    isSuccess,
    isUpdatingTraineeSuccess,
    trainee?.gender,
    trainee?.tans_num,
  ])
  useEffect(() => {
    //the id is phone number
    dispatch(getTraineeById(Number.parseInt(id!)))

    dispatch(reset())
  }, [isSuccess, id, isUpdatingTraineeSuccess, dispatch])
  useEffect(() => {
    if (isUpdatingTraineeSuccess) {
      toast.success("You've updated trainee information Successfully.")
    }
  }, [form, isUpdatingTraineeSuccess])

  useEffect(() => {
    dispatch(getBankAccountsList())
    dispatch(getTrainingList())

    if (isError) {
      toast.error(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch, isUpdatingTraineeSuccess])
  const [isHidden, setIsHidden] = useState(true)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values ", values)
    const traineeData: TraineeUpdateData = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      phone_number: values.phoneNumber,
      email: values.email,
      gender: values.gender,
      account_options: parseInt(values?.bankOptions || "") || undefined,
      training: parseInt(values?.trainingType || "") || undefined,
      trans_num: values.transactionNumber,
      country: values.country || "",
      city: values.city || "",
    }
    dispatch(updateTrainee(traineeData))
  }
  return (
    <Layout>
      <h1 className='text-center capitalize dark:text-white py-2 text-xl'>
        Update Trainee Data
      </h1>
      <Form {...form}>
        <form
          id='uniqueFormId'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 container mx-auto w-full max-w-4xl border p-2 md:p-8 rounded-md'>
          <AlertDialog>
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
                      <Input placeholder='Phone Number' disabled {...field} />
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
                      defaultValue={field.value}
                      value={field.value}>
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
                      value={field.value}
                      defaultValue={field.value}>
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
              <AlertDialogTrigger asChild>
                <Button
                  className='ml-auto w-[150px] bg-[#1E477B] hover:bg-[#1E477B]/85'
                  // type='submit'
                  disabled={isUpdatingTraineeLoading}>
                  {" "}
                  {isUpdatingTraineeLoading ? (
                    <CircleLoader
                      color='#ffffff'
                      size={30}
                      loading={isUpdatingTraineeLoading}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    <p>update</p>
                  )}
                </Button>
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently update the
                  trainee account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Button form='uniqueFormId' type='submit'>
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </Layout>
  )
}
export default UpdateTrainee
