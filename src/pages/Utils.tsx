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
import Layout from "@/layout/Layout"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { ContactForm } from "@/features/utils/utilsService"
import { createContact, reset } from "@/features/utils/utilsSlice"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"

export default function Utils() {
  const dispatch = useAppDispatch()
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.utils
  )
  const formSchema = z.object({
    subject: z.string().optional(),
    message: z.string().min(2, {
      message: "Please, add your message",
    }),

    email: z.string().email("Insert valid email"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: ContactForm = {
      subject: values.subject,
      email: values.email,
      message: values.message,
    }
    dispatch(createContact(data))
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("You've added new contact.")
      form.reset({ subject: "", email: "", message: "" })
    }
  }, [form, isSuccess])
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])
  return (
    <Layout>
      <div className=' mx-auto min-h-full py-16 px-8    '>
        <div className=' p-8  mx-auto  flex flex-col w-full md:w-2/3 justify-center items-center'>
          <img src='/dashboard/login-logo.svg' alt='MultiSolution logo' />
          <h1 className='text-[#1e477b] font-normal py-2 text-2xl mt-3'>
            Reach out to your users
          </h1>
          <Form {...form}>
            <div className=' flex items-center justify-center w-full mt-5  mb-10'>
              <div className='flex flex-col  w-full'>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8 w-full   py-10 md:rounded-tl-3xl md:rounded-bl-3xl '>
                  <div className='flex flex-col space-y-4'>
                    <FormField
                      control={form.control}
                      name='subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-sm font-semibold leading-5 text-[#202224]'>
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='email subject'
                              className='border-[#D8D8D8] bg-[#F8FAFC] dark:bg-transparent py-5'
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
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='email'
                              className='border-[#D8D8D8] bg-[#F8FAFC] dark:bg-transparent py-5'
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
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className='border-[#D8D8D8] bg-[#F8FAFC] dark:bg-transparent py-5'
                              placeholder='your message'
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
                        className='mt-10 w-full ml-auto  bg-[#1e477b] h-[50px] my-3 flex items-center justify-center rounded-sm cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out  hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#f7b12f] before:to-[#f7b12f] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-sm hover:before:left-0 text-[#fff]'
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
                          <p className='text-lg text-white font-bold'>Send</p>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  )
}
