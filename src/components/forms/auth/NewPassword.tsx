import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { reset, resetPassword } from "@/features/auth/authSlice"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { CircleLoader } from "react-spinners"

const FormSchema = z
  .object({
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm: z.string().min(8),
  })
  .refine((data) => data.new_password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })

export function NewPasswordForm() {
  const [isHidden, setIsHidden] = useState(true)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isError, isSuccess, message, forgetPasswordData, isLoading } =
    useAppSelector((state) => state.auth)
  console.log(forgetPasswordData)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      new_password: "",
      confirm: "",
    },
  })
  useEffect(() => {
    if (
      !sessionStorage.getItem("backupEmail") ||
      !sessionStorage.getItem("otp")
    ) {
      navigate("/auth/reset-password")
    }
  }, [navigate])
  useEffect(() => {
    if (forgetPasswordData.email) {
      toast.success(forgetPasswordData.email)
    }
  }, [forgetPasswordData.email])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (isSuccess) {
      sessionStorage.removeItem("backupEmail")
      sessionStorage.removeItem("otp")
      navigate("/auth/login")
    }
    dispatch(reset())
  }, [dispatch, isSuccess, navigate, isError])

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const data = {
      email: sessionStorage.getItem("backupEmail"),
      otp: sessionStorage.getItem("otp"),
      new_password: values.new_password,
    }
    dispatch(resetPassword(data))

    console.log(data)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' space-y-6 mt-10 flex flex-col w-full  justify-center md:w-1/2'>
        <FormField
          control={form.control}
          name='new_password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    className='pr-10'
                    id='new_password'
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
                    <span className='sr-only'>Toggle password visibility</span>
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-center space-y-2'>
          <Button
            type='submit'
            className='min-w-48 w-full mb-2'
            disabled={isLoading}>
            {isLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <p className='text-base text-white font-bold'>Confirm</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
