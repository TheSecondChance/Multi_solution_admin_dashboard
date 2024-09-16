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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TRAINING_OPTIONS } from "@/constants"
import { TrainingData } from "@/features/enrollment/enrollmentService"
import { createNewTraining, reset } from "@/features/enrollment/enrollmentSlice"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
const FormSchema = z.object({
  training: z.string(),
  price: z.string(),
  isActive: z.boolean().default(false).optional(),
})

export function AddNewTraining() {
  const { isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.enrollment
  )
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      training: "",
      price: "",
      isActive: false,
    },
  })
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && message) {
      toast.success(message)
      form.reset()
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, isSuccess, message, dispatch])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const trainingData: TrainingData = {
      training: data.training,
      price: Number.parseInt(data.price),
      is_active: data.isActive,
    }
    dispatch(createNewTraining(trainingData))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 my-3  w-full   rounded-md'>
        <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
          <FormField
            control={form.control}
            name='training'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Training Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select the training type.' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRAINING_OPTIONS?.map((training) => (
                      <SelectItem value={training.label}>
                        {training.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price *</FormLabel>
                <FormControl>
                  <Input placeholder='Price ' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col gap-3'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Is Active?</FormLabel>
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
        <div className='flex justify-end'>
          <Button
            type='submit'
            className='w-[150px] bg-[#1E477B] hover:bg-[#1E477B]/85'>
            {isLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <p className='text-lg text-white font-bold'>add</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
