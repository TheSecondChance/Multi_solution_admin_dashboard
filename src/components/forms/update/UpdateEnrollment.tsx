import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Layout from "@/layout/Layout"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
import { useNavigate, useParams } from "react-router-dom"
import {
  getTraineeEnrollment,
  getTrainingList,
  reset,
  updateEnrollment,
} from "@/features/enrollment/enrollmentSlice"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
import { Input } from "@/components/ui/input"
const formSchema = z.object({
  trainingType: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
})
const UpdateEnrollment = () => {
  const { id, trainingId } = useParams()
  console.log(id)
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainingType: "",
      firstName: "",
      middleName: "",
      lastName: "",
    },
  })
  const navigate = useNavigate()
  const {
    trainings,

    isUpdatingEnrollmentLoading,
    isUpdatingEnrollmentSuccess,
    traineeEnrollment,

    isSuccess,
  } = useAppSelector((state) => state.enrollment)
  useEffect(() => {
    if (!id) return
    dispatch(getTraineeEnrollment(parseInt(id)))

    return () => {
      dispatch(reset())
    }
  }, [dispatch, id, trainingId])
  useEffect(() => {
    form.reset({
      firstName: traineeEnrollment.first_name,
      middleName: traineeEnrollment.middle_name,
      lastName: traineeEnrollment.last_name,
      trainingType: trainingId?.toString(),
    })
  }, [
    form,
    isSuccess,
    traineeEnrollment.first_name,
    traineeEnrollment.middle_name,
    traineeEnrollment.last_name,
    trainingId,
  ])
  useEffect(() => {
    if (isUpdatingEnrollmentSuccess) {
      toast.success("You've updated enrollment data Successfully.")
      navigate("/dashboard/enrollment")
    }
  }, [isUpdatingEnrollmentSuccess, navigate])

  useEffect(() => {
    dispatch(getTrainingList())

    return () => {
      dispatch(reset())
    }
  }, [dispatch, trainingId])
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      training: parseInt(values.trainingType),
    }
    if (!id) {
      return
    }
    dispatch(updateEnrollment({ id, data }))
  }
  return (
    <Layout>
      <h1 className='text-center capitalize dark:text-white py-2 text-xl'>
        Update Enrollment Data
      </h1>
      <Form {...form}>
        <form
          id='uniqueFormId'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 container mx-auto w-full max-w-4xl border p-2 md:p-8 rounded-md'>
          <AlertDialog>
            <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='First Name' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='middleName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Middle Name' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Last Name' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex flex-col gap-8 w-full'>
              <FormField
                control={form.control}
                name='trainingType'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Training type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Training Type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='text-[#263238] dark:text-white'>
                        {trainings?.map((training) => (
                          <SelectItem
                            value={training.id.toString()}
                            key={training.id}>
                            {training.training}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center'>
              <AlertDialogTrigger asChild>
                <Button
                  className='ml-auto w-[150px] bg-[#1E477B] hover:bg-[#1E477B]/85'
                  disabled={isUpdatingEnrollmentLoading}>
                  {" "}
                  {isUpdatingEnrollmentLoading ? (
                    <CircleLoader
                      color='#ffffff'
                      size={30}
                      loading={isUpdatingEnrollmentLoading}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    <p>update</p>
                  )}
                </Button>
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently update the
                  enrollment's selected training.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button form='uniqueFormId' type='submit'>
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </Layout>
  )
}
export default UpdateEnrollment
