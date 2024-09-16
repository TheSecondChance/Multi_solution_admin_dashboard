import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "./ui/button"
import AuthLayout from "@/layout/AuthLayout"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
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
} from "./ui/form"
import { reset, verifyOTP } from "@/features/utils/utilsSlice"
import {
  forgetPassword,
  reset as resetSendOTP,
} from "@/features/auth/authSlice"
const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
})
export function ConfirmOTP() {
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.utils
  )
  const {
    isError: sendOTPError,
    isLoading: sendOTPLoading,
    isSuccess: sendOTPSuccess,
    message: sendOTPMessage,
  } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (sendOTPError) {
      toast.error(sendOTPMessage)
    }
    if (sendOTPSuccess) {
      toast.success(`OTP sent to ${sessionStorage.getItem("backupEmail")}`)
    }
    dispatch(resetSendOTP())
  }, [dispatch, sendOTPError, sendOTPMessage, sendOTPSuccess])
  React.useEffect(() => {
    const session = sessionStorage.getItem("backupEmail")
    if (!session) {
      navigate("/auth/reset-password")
    }
  }, [navigate])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })
  React.useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      sessionStorage.setItem("otp", form.getValues("otp"))
      navigate("/auth/reset-password/new-password")
    }
    dispatch(reset())
  }, [isError, dispatch, isSuccess, form, message, navigate])

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values)
    const data = {
      otp: values.otp,
      email: sessionStorage.getItem("backupEmail"),
    }
    dispatch(verifyOTP(data))
  }
  return (
    <AuthLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem className='my-4 flex flex-col items-center justify-center'>
                <FormLabel className='text-center font-normal w-full'>
                  Please insert the code we've sent you
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={4} {...field}>
                    <InputOTPGroup className='space-x-3 mt-4'>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className=' flex flex-col items-center mt-10'>
            <div className=' flex flex-col items-center'>
              <Button
                type='submit'
                className='min-w-52 w-full mb-2'
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
                  <p className='text-base text-white font-bold'>Continue</p>
                )}
              </Button>
            </div>
            <div className='flex w-full justify-center items-center mt-2'>
              <p className='font-semibold text-sm text-[#061217]'>
                Didn't Get the Message?
              </p>
              <span
                className='font-semibold text-sm text-[#F7B12F] cursor-pointer'
                aria-disabled={sendOTPLoading}
                onClick={() =>
                  dispatch(
                    forgetPassword({
                      email: sessionStorage.getItem("backupEmail"),
                    })
                  )
                }>
                Resend.
              </span>
            </div>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
