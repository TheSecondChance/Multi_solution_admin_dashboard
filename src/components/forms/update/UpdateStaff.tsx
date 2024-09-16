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
import { Switch } from "@/components/ui/switch"
import {
  getUserByPhoneNumber,
  updateUser,
} from "@/features/account/accountSlice"
import { Staff } from "@/features/auth/authService"
import { reset } from "@/features/account/accountSlice"
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
const UpdateStaff = () => {
  const { admin } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const {
    isError,
    isSuccess,
    staff,
    isUpdatingUserLoading,
    isUpdatingUserSuccess,
    message,
  } = useAppSelector((state) => state.account)

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

  const { id } = useParams()
  //fetch trainee dat
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (isUpdatingUserSuccess) {
      toast.success("You've updated user information Successfully.")
    }
  }, [isUpdatingUserSuccess])
  useEffect(() => {
    form.reset({
      firstName: staff.first_name,
      middleName: staff.middle_name,
      lastName: staff.last_name,
      phoneNumber: staff.phone_number,
      isSuperUser: staff.is_superuser,
      isPhoneNumberVerified: staff.is_phone_verified,
      email: staff.email,
      gender: staff.gender == null ? "M" : staff.gender,
      country: "ethiopia",
      city: staff.city,

      password: staff.password,
      confirm: "",
    })
  }, [
    form,
    isSuccess,
    staff.first_name,
    staff.middle_name,
    staff.last_name,
    staff.phone_number,
    staff.is_staff,
    staff.is_superuser,
    staff.is_phone_verified,
    staff.email,
    staff.gender,
    staff.city,
    staff.password,
  ])
  console.log("loading", isUpdatingUserLoading)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    //the id is phone number
    dispatch(getUserByPhoneNumber(Number.parseInt(id!)))

    dispatch(reset())
  }, [id, dispatch, isUpdatingUserSuccess])

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

    dispatch(updateUser(userData))
  }
  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 container mx-auto w-full max-w-4xl border p-2 md:p-8 rounded-md'
          id='staff'>
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
              <AlertDialogTrigger asChild>
                <Button
                  className='ml-auto w-[150px] bg-[#1E477B] hover:bg-[#1E477B]/85'
                  // type='submit'
                  disabled={isUpdatingUserLoading}>
                  {" "}
                  {isUpdatingUserLoading ? (
                    <CircleLoader
                      color='#ffffff'
                      size={30}
                      loading={isUpdatingUserLoading}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    <p>update Staff</p>
                  )}
                </Button>
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently update the
                  staff account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Button form='staff' type='submit'>
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
export default UpdateStaff
