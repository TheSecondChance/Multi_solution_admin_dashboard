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
  getSpecificTraining,
  updateTraining,
} from "@/features/enrollment/enrollmentSlice"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"

const FormSchema = z.object({
  training: z.string(),
  price: z
    .string()

    .optional(),
  trainee: z
    .string()

    .optional(),
  isActive: z.boolean().default(false).optional(),
})

export function UpdateTraining({ id }: { id: number }) {
  console.log("Id ", id)
  const [formData, setFormData] = useState({
    training: "",
    price: "",
    isActive: false,
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      training: "",
      price: "",
      isActive: false,
    },
  })
  const { isError, isSuccess, isUpdateTrainingLoading, training, message } =
    useAppSelector((state) => state.enrollment)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getSpecificTraining(id))
    setFormData({
      training: training?.training || "",
      price: training?.price?.toString() || "",
      isActive: training?.is_active || false,
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    form.setValue("training", formData?.training)
    form.setValue("price", formData?.price)
    form.setValue("isActive", formData?.isActive)
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && message) {
      toast.success(message)
    }
  }, [
    isError,
    isSuccess,
    message,
    dispatch,
    training?.training,
    training?.trainee,
    training?.price,
    training?.is_active,
    form,
    formData?.training,
    formData?.price,
    formData?.isActive,
    id,
  ])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const trainingData = {
      training: data.training,
      price: data.price,
      is_active: data.isActive,
      trainee: data.trainee,
    }
    const payload = {
      id: id,
      trainingData: trainingData,
    }
    dispatch(updateTraining(payload))
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
                <FormLabel>Training *</FormLabel>
                <FormControl>
                  <Input disabled placeholder='Training type' {...field} />
                </FormControl>

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
            {isUpdateTrainingLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isUpdateTrainingLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <p className='text-lg text-white font-bold'>update</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
