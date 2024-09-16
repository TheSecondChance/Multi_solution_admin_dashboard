import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  deleteTraining,
  getTrainingList,
  reset,
} from "@/features/enrollment/enrollmentSlice"
import { MoreHorizontal } from "lucide-react"
import { SVGProps, useEffect, useState } from "react"
import { JSX } from "react/jsx-runtime"
import toast from "react-hot-toast"
import { FaChevronRight } from "react-icons/fa"
import { AddNewTraining } from "./AddNewTraining"
import { UpdateTraining } from "./UpdateTraining"
import { format } from "date-fns"

export default function ManageTraining() {
  const dispatch = useAppDispatch()
  const [addTraining, setAddTraining] = useState(false)
  const [updateTraining, setUpdateTraining] = useState(false)
  const [trainingId, setTrainingId] = useState(1)
  const onUpdate = (id: number) => {
    console.log("T id ", trainingId)
    setUpdateTraining(true)
    setAddTraining(false)
    setTrainingId(id)
  }

  const onDelete = (id: number) => {
    dispatch(deleteTraining(id))
  }
  const {
    trainings,
    isError,
    message,
    isDeletingTrainingLoading,
    isDeletingTrainingSuccess,
  } = useAppSelector((state) => state.enrollment)
  useEffect(() => {
    if (isDeletingTrainingSuccess) {
      toast.success("You've successfully deleted the training.")
    }
    dispatch(getTrainingList())

    if (isError) {
      toast.error(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isDeletingTrainingSuccess, isError, message])
  return (
    <div>
      <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8  border rounded-md'>
        <div className='flex flex-col mb-6 gap-2'>
          <h1 className='text-2xl font-bold'>Trainings</h1>
          {updateTraining == false && (
            <Button
              className='w-52 bg-transparent hover:text-white dark:text-white text-black border border-md'
              onClick={() => setAddTraining(true)}>
              <PlusIcon className='h-4 w-4 mr-2' />
              Add New Training
            </Button>
          )}
          {updateTraining && (
            <Button className='w-52 bg-transparent hover:text-white dark:text-white text-black border border-md'>
              <PlusIcon className='h-4 w-4 mr-2' />
              Update Training
            </Button>
          )}
        </div>
        {addTraining && <AddNewTraining />}
        {updateTraining && <UpdateTraining id={trainingId} />}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {trainings?.map((training) => (
            <Card key={training.id} className='bg-transparent'>
              <CardHeader className='dark:bg-teritary'>
                <div className='!flex items-center justify-between w-full'>
                  <div className='flex gap-2'>
                    <img
                      src='/dashboard/wallet-icon.svg'
                      alt='Wallet-icon'
                      className='w-8 h-8'
                    />
                    <div>
                      <CardTitle className='capitalize'>
                        {training.training}
                      </CardTitle>
                    </div>{" "}
                  </div>
                  <div>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            disabled={isDeletingTrainingLoading}
                            className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-50'
                            size='icon'
                            variant='ghost'>
                            <MoreHorizontal className='h-5 w-5' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DialogTrigger asChild>
                            <DropdownMenuItem>
                              <TrashIcon className='h-4 w-4 mr-2' />
                              Delete
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem
                            onClick={() => onUpdate(training.id)}>
                            <DeleteIcon className='h-4 w-4 mr-2' />
                            Update
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                          <DialogTitle className='text-center'>
                            Delete Training
                          </DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete {training.training}?
                          </DialogDescription>
                        </DialogHeader>
                        <div className='bg-[#FFE9D9] border-l-8 py-6 px-3 border-l-[#FF1A1A]'>
                          <p className='text-[#BC4C2E]'>
                            By Deleteing this account, you won’t be able to get{" "}
                            {training.training} data again.
                          </p>
                        </div>
                        <DialogFooter className='w-full mt-2 flex !items-center !justify-between'>
                          <Button type='submit'>No,Cancel</Button>
                          <Button
                            onClick={() => onDelete(training.id)}
                            className='bg-[#FF0000] hover:bg-[#FF0000]/75'>
                            Yes,Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className='font-normal text-[#79808A] my-2 text-xs leading-5'>
                  Created Date,{" "}
                  {format(new Date(training?.created_at), "MMMM d yyyy")}
                </p>
                <div className='flex items-center justify-between'>
                  <p className='font-normal text-[#1E477B] text-lg leading-6'>
                    {training.price}
                  </p>
                  <p className='font-normal flex gap-2 items-center text-[#F7B12F] text-sm leading-5'>
                    Trainees{" "}
                    <span>
                      {" "}
                      <FaChevronRight color='#F7B12F' />
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function DeleteIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z' />
      <line x1='18' x2='12' y1='9' y2='15' />
      <line x1='12' x2='18' y1='9' y2='15' />
    </svg>
  )
}

function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  )
}
function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  )
}
