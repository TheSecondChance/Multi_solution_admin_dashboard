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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react"
import * as React from "react"
import { useEffect, useState } from "react"
import { reset } from "../../../features/enrollment/enrollmentSlice"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  deleteEnrollment,
  getEnrolledUsers,
} from "@/features/enrollment/enrollmentSlice"
import { cn } from "@/lib/utils"
import { exportToCSV, exportToExcel, usePrint } from "@/utils/utils"
import axios from "axios"
import { format } from "date-fns"
import toast from "react-hot-toast"
import TableLoadingSkeleton from "../../skeletons/TableLoadingSkeleton"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
export type EnrollmentResult = {
  id: number
  enrollment_date: string
  user: number
  training: number
}
interface Training {
  id: number
  training: string
  price: number
  created_at: string
  is_active: boolean
}

export default function RecentEnrollment({ title }: { title: string }) {
  const navigate = useNavigate()
  const { admin } = useAppSelector((state) => state.auth)

  const [page, setPage] = React.useState(1)
  const onPrevious = () => {
    setPage((prevPage) => (prevPage ? prevPage - 1 : 1))
  }
  const onNext = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const [trainings, setTrainings] = React.useState<Training[]>([
    {
      id: 0,
      training: "",
      price: 0,
      created_at: "",
      is_active: false,
    },
  ])

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SOME_KEY}enrollment/training/`
        )
        const responseData: Training[] = await response.data
        setTrainings(responseData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTrainings()
  }, [])
  const {
    enrolledUsers,
    isLoading,
    isDeletingEnrollmentLoading,
    isError,
    message,
    isDeletingEnrollmentSuccess,
  } = useAppSelector((state) => state.enrollment)
  const { results: data } = enrolledUsers
  const { count } = enrolledUsers
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const onDelete = (id: number) => {
    dispatch(deleteEnrollment(id))
  }

  const columns: ColumnDef<EnrollmentResult>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "enrollment_date",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Enrollment Date
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='capitalize'>{`${format(
          new Date(row.getValue("enrollment_date")),
          "yyyy-MM-dd"
        )}`}</div>
      ),
    },
    {
      accessorKey: "training_type",
      header: "Training",
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue("training_type")}</div>
      ),
    },

    {
      accessorKey: "first_name",
      header: "First Name",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("first_name")}</div>
      ),
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("last_name")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const enrollment = row.original

        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                  disabled={isDeletingEnrollmentLoading}>
                  <MoreHorizontal className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  className='text-[#00B69B] focus:text-[#00B69B]'
                  onClick={() =>
                    navigate(
                      `/dashboard/enrollment/update/trainee/${enrollment.id}/${enrollment.training}`
                    )
                  }>
                  <Pencil className='h-4 w-4 mr-2 text-[#00B69B]' />
                  update
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  {admin.is_superuser && (
                    <DropdownMenuItem className='text-red-600 focus:text-red-600'>
                      <Trash className='h-4 w-4 mr-2 text-red-600' />
                      Delete
                    </DropdownMenuItem>
                  )}
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  trainee and remove trainee's data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-red-600 hover:bg-red-500'
                  onClick={() => onDelete(enrollment.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
    },
  ]
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])
  useEffect(() => {
    if (isDeletingEnrollmentSuccess) {
      toast.success("You've successfully deleted the enrollment.")
    }

    dispatch(getEnrolledUsers(page))

    dispatch(reset())
  }, [dispatch, isDeletingEnrollmentSuccess, page])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id.toString(),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const findTrainingByName = (value: string): Training | undefined => {
    return trainings.find(
      (training) => training.training.toLowerCase() === value.toLowerCase()
    )
  }
  function capitalizeWords(input: string): string {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }
  const componentRef = React.useRef<HTMLDivElement | null>(null)
  const handlePrint = usePrint(componentRef)
  const handleDeleteSelectedRows = () => {
    table.getSelectedRowModel().rows.forEach((data) => {
      dispatch(deleteEnrollment(parseInt(data.id)))
    })
  }
  return (
    <div className='w-full border p-6 mt-8 rounded-md'>
      <h1 className='font-medium text-base md:text-xl leading-7 dark:text-white'>
        {title}
      </h1>
      <div className='flex items-center py-4 gap-3'>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'>
                {findTrainingByName(value)?.training
                  ? findTrainingByName(value)?.training
                  : "Select training type"}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Search training...' />
                <CommandList>
                  <CommandEmpty>No training found.</CommandEmpty>
                  <CommandGroup>
                    {trainings?.map((training) => (
                      <CommandItem
                        key={training.id}
                        value={training.training}
                        onSelect={(
                          currentValue: React.SetStateAction<string>
                        ) => {
                          setValue(currentValue === value ? "" : currentValue)
                          currentValue &&
                            table
                              .getColumn("training_type")
                              ?.setFilterValue(
                                capitalizeWords(currentValue.toString())
                              )
                          setOpen(false)
                        }}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === training.training
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {training.training}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {table.getSelectedRowModel().rows.length >= 1 &&
              admin.is_superuser && (
                <Button
                  disabled={isDeletingEnrollmentLoading}
                  variant='destructive'>
                  Deleted Selected rows
                </Button>
              )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                selected enrollments data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSelectedRows}
                className='bg-red-600 hover:bg-red-500'>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className='ml-auto flex flex-col gap-4'></div>
      </div>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <div className='rounded-md border' ref={componentRef}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row items-center justify-between space-x-2 py-4'>
        <div className='flex gap-2 '>
          <Button
            size='sm'
            className='flex gap-2 bg-[#1E477B]'
            onClick={() => exportToCSV(data, "trainee-payment")}>
            <p>CSV</p>
            <img src='/dashboard/csv-icon.svg' alt='CSV icon' />
          </Button>
          <Button
            size='sm'
            className='flex gap-2 bg-[#F7B12F] hover:bg-[#F7B12F]/85'
            onClick={handlePrint}>
            <p>PRINT</p>
            <img src='/dashboard/pdf-icon.svg' alt='pdf icon' />
          </Button>
          <Button
            size='sm'
            className='flex gap-2 bg-[#00D42F] hover:bg-[#00D42F]/85'
            onClick={() => exportToExcel(data, "trainee-payment")}>
            <p>Excel</p>
            <img src='/dashboard/excel-icon.svg' alt='pdf icon' />
          </Button>
        </div>
        <div className='space-x-2 flex items-center'>
          <Button
            variant='outline'
            size='icon'
            disabled={page == 1}
            onClick={() => setPage(1)}>
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={onPrevious}
            disabled={page == 1}>
            Prev
          </Button>

          <div className='flex items-center gap-1'>
            page:{" "}
            <Input
              type='number'
              id='icon-size'
              placeholder={page.toString()}
              className='w-16 text-center'
              min={1}
              max={Math.ceil(count / 10)}
              onChange={(e) => {
                if (parseInt(e.target.value) <= Math.ceil(count / 10))
                  setPage(parseInt(e.target.value))
              }}
            />
            of {Math.ceil(count / 10)}
          </div>
          <Button
            // variant='outline'
            className='bg-primary'
            size='sm'
            onClick={onNext}
            disabled={page == Math.ceil(count / 10)}>
            Next
          </Button>
          <Button
            variant='outline'
            size='icon'
            disabled={page == Math.ceil(count / 10)}
            onClick={() => setPage(Math.ceil(count / 10))}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
