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
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { CircleLoader } from "react-spinners"
import toast from "react-hot-toast"
import { ContactUsData } from "@/features/contact/contactService"
import { contactUs, reset } from "@/features/contact/contactSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import BotLayout from "@/layout/BotLayout"

export default function ContactUs() {
  const { t } = useTranslation()
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: t("first_name_error"),
    }),
    middleName: z.string().optional(),
    message: z.string().min(2, {
      message: t("message_error"),
    }),

    email: z.string().email(t("email_error")),
  })
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      message: "",
      email: "",
    },
  })
  const { isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.contact
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(t("success_message"))
      form.reset()
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch, t, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const inquiry: ContactUsData = {
      first_name: values.firstName,
      last_name: values.middleName,
      email: values.email,
      message: values.message,
    }
    dispatch(contactUs(inquiry))
  }

  return (
    <BotLayout>
      <h1 className='text-center font-bold  text-[#202224] text-base leading-5'>
        {t("get_in_touch")}
      </h1>
      <p className='text-[#202224] font-light text-xs leading-3'>
        {t("leave_message")}
      </p>

      <Form {...form}>
        <div className=' flex items-center justify-center w-full  my-10'>
          <div className='flex flex-col  w-full'>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full   py-10 md:rounded-tl-3xl md:rounded-bl-3xl '>
              <div className='flex flex-col space-y-4'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("first_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("first_name")}
                          className='border-[#D8D8D8] bg-[#F8FAFC] py-5'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='middleName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("middle_name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("middle_name")}
                          className='border-[#D8D8D8] bg-[#F8FAFC] py-5'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("email")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("email")}
                          className='border-[#D8D8D8] bg-[#F8FAFC] py-5'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                        {t("message")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className='border-[#D8D8D8] bg-[#F8FAFC] py-5'
                          placeholder={t("message")}
                          id='message'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='w-full'>
                  <Button
                    type='submit'
                    className='mt-10 w-full ml-auto  bg-[#1e477b] h-[50px] my-3 flex items-center justify-center rounded-sm cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out  hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#f7b12f] before:to-[#f7b12f] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-sm hover:before:left-0 text-[#fff]'>
                    {isLoading ? (
                      <CircleLoader
                        color='#ffffff'
                        size={30}
                        loading={isLoading}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                      />
                    ) : (
                      <div>{t("send_message")}</div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Form>
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex items-center gap-3'>
          <img
            src='/email-multi-solution.svg'
            alt='email'
            className='w-[35px]'
          />
          <p className='font-medium leading-7 text-[#0D0D2D]'>
            multisoulution@outlook.com
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <img
            src='/email-multi-solution.svg'
            alt='email'
            className='w-[35px]'
          />
          <p className='font-medium leading-7 text-[#0D0D2D]'>
            multisoulution@gmail.com
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <img
            src='/telegram-multi-solution.svg'
            alt='email'
            className='w-[35px]'
          />
          <p className='font-medium leading-7 text-[#0D0D2D]'>
            t.me/multisolution
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <img
            src='/call-muti-solution.svg'
            alt='phone number'
            className='w-[35px]'
          />
          <p className='font-medium leading-7 text-[#0D0D2D]'>
            +251900000001 / +251900000001
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <img
            src='/location-multi-solution.svg'
            alt='location'
            className='w-[35px]'
          />
          <p className='font-medium leading-7 text-[#0D0D2D]'>
            {t("location")}
          </p>
        </div>
      </div>
    </BotLayout>
  )
}
