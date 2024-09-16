import Layout from "@/layout/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { useParams } from "react-router-dom"
import {
  getMonthlyPaymentCycle,
  reset,
  updateMonthlyPaymentCycle,
} from "@/features/finance/financeSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
const FormSchema = z.object({
  opening_date: z.date({
    required_error: "Opening date is required.",
  }),
  closing_date: z.date({
    required_error: "Opening date is required.",
  }),
  is_active: z.boolean({ message: "is active is required" }).default(true),
})
const UpdateMonthlySchedule = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const {
    isError,
    message,
    monthlyPaymentCycle,
    isUpdatingSuccess,
    isSuccess,
    isUpdatingLoading,
  } = useAppSelector((state) => state.finance)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const data = {
      id: monthlyPaymentCycle.id,
      opening_date: values.opening_date,
      closing_date: values.closing_date,
      is_active: values.is_active,
    }

    dispatch(updateMonthlyPaymentCycle(data))
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (isUpdatingSuccess) {
      toast.success("You've updated this monthly schedule")
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(getMonthlyPaymentCycle(parseInt(id)))
    dispatch(reset())
  }, [dispatch, id, isUpdatingSuccess])

  useEffect(() => {
    if (monthlyPaymentCycle.opening_date)
      form.reset({
        closing_date: new Date(monthlyPaymentCycle?.closing_date),

        opening_date: new Date(monthlyPaymentCycle?.opening_date),
        is_active: monthlyPaymentCycle?.is_active,
      })
  }, [
    form,
    isSuccess,
    monthlyPaymentCycle?.closing_date,
    monthlyPaymentCycle?.is_active,
    monthlyPaymentCycle?.opening_date,
  ])
  return (
    <Layout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 border rounded-md p-4'>
          <h1>Payment Schedule</h1>
          <div className='flex flex-col md:flex-row items-center space-x-2 justify-between'>
            <FormField
              control={form.control}
              name='opening_date'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full '>
                  <FormLabel>Opening Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='closing_date'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel>Closing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='is_active'
            render={({ field }) => (
              <FormItem className='flex items-center gap-3'>
                <FormLabel className='text-base'>Is Active</FormLabel>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex items-center justify-end'>
            <Button type='submit' className='w-40'>
              {isUpdatingLoading ? (
                <CircleLoader
                  color='#ffffff'
                  size={30}
                  loading={isUpdatingLoading}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                />
              ) : (
                <p>update</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Layout>
  )
}

export default UpdateMonthlySchedule
