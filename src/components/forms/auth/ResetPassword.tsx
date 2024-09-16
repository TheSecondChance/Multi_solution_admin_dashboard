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
import { forgetPassword } from "@/features/auth/authSlice"
import { reset } from "@/features/auth/authSlice"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { CircleLoader } from "react-spinners"
const FormSchema = z.object({
  email: z.string().email("Please insert your backup email address"),
})

export default function ResetPassword() {
  const { isLoading, isError, isSuccess, message, forgetPasswordData } =
    useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  useEffect(() => {
    sessionStorage.removeItem("backupEmail")
  }, [])
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("backupEmail", form.getValues("email"))
      navigate("/auth/reset-password/confirm-otp")
    }
  }, [forgetPasswordData.email, form, isSuccess, navigate])
  useEffect(() => {
    dispatch(reset())
  }, [dispatch, isSuccess])
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data ", data)

    dispatch(forgetPassword(data))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full md:w-4/6 lg:w-1/2 space-y-6 flex flex-col items-center'>
        <h1 className='text-xl font-medium text-[#303B41] dark:text-white/85 py-6'>
          Submit your backup Email
        </h1>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
              <p className='text-base text-white font-bold'>Reset</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
