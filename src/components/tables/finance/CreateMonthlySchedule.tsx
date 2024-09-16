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
import { Switch } from "../../ui/switch"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { CircleLoader } from "react-spinners"
import {
  createMonthlyPaymentCycle,
  reset,
} from "@/features/finance/financeSlice"
import { useEffect } from "react"
import toast from "react-hot-toast"
const FormSchema = z.object({
  opening_date: z.date({
    required_error: "Opening date is required.",
  }),
  closing_date: z.date({
    required_error: "Opening date is required.",
  }),
  is_active: z.boolean({ message: "is active is required" }).default(true),
})

const CreateMonthlySchedule = () => {
  const dispatch = useAppDispatch()

  const {
    isError,
    message,
    isCreatingScheduleSuccess,
    isCreatingScheduleLoading,
  } = useAppSelector((state) => state.finance)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(createMonthlyPaymentCycle(data))
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (isCreatingScheduleSuccess) {
      toast.success("You've added new monthly schedule")
      form.reset()
    }

    dispatch(reset())
  }, [dispatch, isCreatingScheduleSuccess])
  return (
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
                      disabled={(date) => date < new Date()}
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
                      disabled={(date) => date < new Date()}
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
            {isCreatingScheduleLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isCreatingScheduleLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <p>Add</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateMonthlySchedule
