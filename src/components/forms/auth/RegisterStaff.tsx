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
import { Switch } from "@/components/ui/switch"
import { Staff } from "@/features/auth/authService"
import { registerUser, reset } from "@/features/auth/authSlice"
import { getTrainingList } from "@/features/enrollment/enrollmentSlice"
import { getBankAccountsList } from "@/features/finance/financeSlice"
import Layout from "@/layout/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
import { z } from "zod"
import { Button } from "../../ui/button"
import { normalizePhoneNumber } from "@/utils/utils"
const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    middleName: z.string().min(2, {
      message: "Middle Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    isSuperUser: z.boolean().default(false),
    isStaff: z.boolean().default(true),
    isPhoneNumberVerified: z.boolean().default(false),

    phoneNumber: z.string().regex(/^(2519\d{8}|2517\d{8}|07\d{8}|09\d{8})$/, {
      message:
        "Invalid phone number. It must start with 2519,2517,07 or 09 followed by 8 digits",
    }),
    email: z.string(),
    gender: z.string(),
    country: z.string(),
    city: z.string(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
const RegisterStaff = () => {
  const { admin } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const {
    isError,
    message,
    isRegisteringUserLoading,
    isRegisteringUserSuccess,
  } = useAppSelector((state) => state.auth)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      phoneNumber: "",
      isStaff: true,
      isSuperUser: false,
      isPhoneNumberVerified: false,
      email: "",
      gender: "M",
      country: "ethiopia",
      city: "",

      password: "",
      confirm: "",
    },
  })
  useEffect(() => {
    dispatch(getBankAccountsList())
    dispatch(getTrainingList())

    if (isError) {
      toast.error(message)
    }

    if (isRegisteringUserSuccess) {
      toast.success("You've registered user Successfully.")
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, isRegisteringUserSuccess, message, dispatch])
  useEffect(() => {
    if (isRegisteringUserSuccess) {
      form.reset({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        isStaff: true,
        isSuperUser: false,
        isPhoneNumberVerified: false,
        email: "",
        gender: "M",
        country: "ethiopia",
        city: "",

        password: "",
        confirm: "",
      })
    }
  }, [form, isRegisteringUserSuccess])
  const [isHidden, setIsHidden] = useState(true)

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const userData: Staff = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName,
      phone_number: normalizePhoneNumber(values.phoneNumber),
      email: values.email,
      gender: values.gender,
      is_superuser: values.isSuperUser,
      is_phone_verified: values.isPhoneNumberVerified,
      is_staff: values.isStaff,
      country: values.country,
      city: values.city,
      password: values.password,
    }

    dispatch(registerUser(userData))

    if (isError) {
      toast.error(message)
    }
  }
  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 container mx-auto w-full max-w-4xl border p-2 md:p-8 rounded-md'>
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
          <div
            className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full
          '>
            <FormField
              control={form.control}
              name='isStaff'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Is Staff</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      disabled
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isSuperUser'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>Is Super user</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={!admin.is_superuser}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isPhoneNumberVerified'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      Is Phone number verified
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-8 w-full'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        className='pr-10'
                        id='password'
                        placeholder='Password'
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
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        className='pr-10'
                        id='confirm'
                        placeholder='confirm password'
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
              disabled={isRegisteringUserLoading}>
              {" "}
              {isRegisteringUserLoading ? (
                <CircleLoader
                  color='#ffffff'
                  size={30}
                  loading={isRegisteringUserLoading}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              ) : (
                <p>Register Staff</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  )
}
export default RegisterStaff
