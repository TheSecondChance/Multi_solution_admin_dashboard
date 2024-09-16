import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getUserByPhoneNumber,
  reset,
  updateUser,
} from "@/features/account/accountSlice"
import { Staff } from "@/features/auth/authService"
import { getMe } from "@/features/auth/authSlice"
import Layout from "@/layout/Layout"
import { sliceFirstCharacter } from "@/utils/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
import { z } from "zod"
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

    phoneNumber: z
      .string()
      .min(12, {
        message: "Phone Number must be 12 characters.",
      })
      .max(12, {
        message: "Phone Number must be 12 characters.",
      }),
    email: z.string(),
    gender: z.string(),
    country: z.string(),
    city: z.string(),

    password: z
      .string()
      .min(4, { message: "Password must be at least 8 characters long" }),
    confirm: z.string().min(4),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
export default function Setting() {
  const dispatch = useAppDispatch()
  const [isHidden, setIsHidden] = useState(true)
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
  const {
    isError,
    isSuccess,
    staff,
    isUpdatingUserLoading,
    isUpdatingUserSuccess,
    message,
  } = useAppSelector((state) => state.account)
  const { admin } = useAppSelector((state) => state.auth)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(getMe())
  }, [dispatch, isUpdatingUserSuccess])

  //fetch user data
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
      middleName: staff.middle_name ? staff.middle_name : "",
      lastName: staff.last_name,
      phoneNumber: staff.phone_number,
      isSuperUser: staff.is_superuser,
      isPhoneNumberVerified: staff.is_phone_verified,
      email: staff.email ? staff.email : "",
      gender: staff.gender ? staff.gender : "",
      country: "ethiopia",
      city: staff.city ? staff.city : "",

      password: "",
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
  useEffect(() => {
    const userDataString = localStorage.getItem("user")
    const phone_number =
      userDataString && JSON.parse(userDataString)?.phone_number
    dispatch(getUserByPhoneNumber(phone_number))
  }, [isSuccess, dispatch, isUpdatingUserSuccess])
  useEffect(() => {
    dispatch(reset())
  }, [dispatch, isUpdatingUserSuccess])
  function onSubmit(values: z.infer<typeof formSchema>) {
    const userData: Staff = {
      first_name: values.firstName,
      middle_name: values.middleName,
      last_name: values.lastName || "",
      phone_number: values.phoneNumber,
      email: values.email || "sol@gmail.com",
      gender: values.gender,
      is_superuser: values.isSuperUser,
      is_phone_verified: values.isPhoneNumberVerified,
      is_staff: true,
      country: values.country || "",
      city: values.city || "",
      password: values.password,
    }

    dispatch(updateUser(userData))

    if (isError) {
      toast.error(message)
    }
  }
  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='container mx-auto min-h-screen my-12 px-4 sm:px-6 lg:px-8'>
          <Tabs defaultValue='account' className=''>
            <div className='flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8'>
              <div className='flex items-center space-x-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage alt='avatar' src='/placeholder-avatar.jpg' />
                  <AvatarFallback className='capitalize'>
                    {" "}
                    {sliceFirstCharacter(admin?.first_name) +
                      " " +
                      sliceFirstCharacter(admin?.middle_name)}
                  </AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                  <h2 className='text-xl font-bold'>
                    {admin?.first_name +
                      " " +
                      admin?.middle_name +
                      " " +
                      admin?.last_name}
                  </h2>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Staff member
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2'>
              <div className='flex flex-col my-6 space-y-3'>
                <TabsList className='space-y-2 flex flex-col mt-6'>
                  <TabsTrigger
                    value='account'
                    className='flex items-center w-full justify-between rounded-md bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300'>
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value='permission'
                    className='flex w-full items-center justify-between rounded-md bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300'>
                    Permission
                  </TabsTrigger>
                  <TabsTrigger
                    value='password'
                    className='flex my-4 w-full items-center justify-between rounded-md bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300'>
                    Password
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className='space-y-4'>
                <TabsContent value='account' className='space-y-2'>
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
                          <Input
                            defaultValue={field.value}
                            placeholder='Middle Name'
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Last Name' {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value='permission' className='space-y-2'>
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
                          <FormLabel className='text-base'>
                            Is Super user
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
                </TabsContent>
                <TabsContent value='password' className='space-y-2'>
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
                </TabsContent>
                <div className='flex items-center justify-between'>
                  <Button className='ml-auto' disabled={isUpdatingUserLoading}>
                    {isUpdatingUserLoading ? (
                      <CircleLoader
                        color='#ffffff'
                        size={30}
                        loading={isUpdatingUserLoading}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                      />
                    ) : (
                      <p>Save Changes</p>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                {!admin.is_superuser && (
                  <Button
                    className='text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 mt-auto'
                    variant='outline'>
                    Delete Account
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className='text-center'>Delete User</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account?
                  </DialogDescription>
                </DialogHeader>
                <div className='bg-[#FFE9D9] border-l-8 py-6 px-3 border-l-[#FF1A1A]'>
                  <p className='text-[#BC4C2E]'>
                    By Deleteing this account, you won’t be able to get user
                    data again.
                  </p>
                </div>
                <DialogFooter className='w-full mt-2 flex !items-center !justify-between'>
                  <Button type='submit'>No,Cancel</Button>
                  <Button
                    type='submit'
                    className='bg-[#FF0000] hover:bg-[#FF0000]/75'>
                    Yes,Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Tabs>
        </form>{" "}
      </Form>
    </Layout>
  )
}
