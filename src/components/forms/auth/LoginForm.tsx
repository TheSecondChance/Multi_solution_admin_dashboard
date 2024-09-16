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
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { LoginUser, reset } from "@/features/auth/authSlice"
import { CircleLoader } from "react-spinners"
import Cookies from "js-cookie"
import { LoginData } from "@/features/auth/authService"
import { normalizePhoneNumber } from "@/utils/utils"
const FormSchema = z.object({
  phoneNumber: z.string().regex(/^(2519\d{8}|2517\d{8}|07\d{8}|09\d{8})$/, {
    message:
      "Invalid phone number. It must start with 2519,2517,07 or 09 followed by 8 digits",
  }),
  password: z.string().min(4, {
    message: "Password must be atleaset 8 characters.",
  }),
})

export default function LoginForm() {
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isHidden, setIsHidden] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("authToken"))

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("authToken")
      setIsLoggedIn(!!token)
    }

    checkAuth()

    const intervalId = setInterval(checkAuth, 1000)

    return () => clearInterval(intervalId)
  }, [])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || isLoggedIn) {
      navigate("/")
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch, isLoggedIn])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const userData: LoginData = {
      phone_number: normalizePhoneNumber(data.phoneNumber),
      password: data.password,
    }
    console.log(userData)

    dispatch(LoginUser(userData))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full md:w-4/6 lg:w-1/2 space-y-6 flex flex-col items-center'>
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder='2519...' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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
                    <span className='sr-only'>Toggle password visibility</span>
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className=' flex flex-col items-center'>
          <Button type='submit' className='w-full mb-2' disabled={isLoading}>
            {isLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <p className='text-lg text-white font-bold'>Login</p>
            )}
          </Button>
          <div className='flex w-full '>
            <p className='font-semibold text-sm text-[#061217]'>
              Forget Password?
            </p>
            <Link
              to='/auth/reset-password'
              className='font-semibold text-sm text-[#F7B12F]'>
              {" "}
              Click here
            </Link>{" "}
          </div>
        </div>
      </form>
    </Form>
  )
}
