import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  ArrowUpZA,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GitPullRequestClosed,
  MoreHorizontal,
  Pencil,
} from "lucide-react"
import * as React from "react"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
import {
  reset,
  setTraineeToPending,
} from "../../../features/finance/financeSlice"

import { Button } from "@/components/ui/button"

import { Dialog } from "@/components/ui/dialog"
import { Finance, TraineeStatus } from "@/features/finance/financeService"
import {
  approveTrainee,
  getTraineePaymentList,
  rejectTrainee,
} from "@/features/finance/financeSlice"
import Layout from "@/layout/Layout"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { exportToCSV, exportToExcel, usePrint } from "@/utils/utils"
export type TraineePaymentResult = {
  id: number
  first_name: string
  last_name: string
  training: string
  phone_number: string
  bank_name: string
  trans_num: string
  amount: string
  is_completed: boolean
  is_rejected: boolean
  created_at: string
  user: number
}
export default function RejectedTrainees({ title }: { title: string }) {
  const [page, setPage] = React.useState(1)
  const onPrevious = () => {
    setPage((prevPage) => (prevPage ? prevPage - 1 : 1))
  }
  const onNext = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const assignColor = (status: Finance) => {
    if (status.is_completed == true) return "bg-[#CCF0EB] text-[#00B69B] "
    else if (status.is_completed == false && status.is_rejected == false)
      return "bg-[#FDEFD5] text-[#F7B12F]"
    else return "bg-[#FCD7D4] text-[#EF3826]"
  }
  const {
    traineePaymentList,
    isRejectingLoading,
    isRejectingSuccess,
    isUpdatingLoading,
    isUpdatingSuccess,
    isSettingToPendingLoading,
    isSettingToPendingSuccess,
  } = useAppSelector((state) => state.finance)
  const { count, results: data } = traineePaymentList

  const dispatch = useAppDispatch()
  const onUpdate = (payment: TraineeStatus) => {
    if (payment.is_completed == false) {
      dispatch(approveTrainee(payment))
    }
    if (payment.is_completed == true) {
      toast("The Trainee is already in Approved state", {
        style: {
          background: "rgba(242, 244, 252, 0.7)",
          borderLeft: "6px solid #F7B12F ",
          borderRadius: "4px 0px 0px 4px",
          color: "#2B2B2B",
          paddingBlock: "20px",
        },
      })
    }
  }
  const onPending = (payment: TraineeStatus) => {
    if (payment.is_completed == true || payment.is_rejected == true) {
      console.log("clicked")
      dispatch(setTraineeToPending(payment))
    }
    if (payment.is_completed == false && payment.is_rejected == false) {
      toast("The Trainee is already in Pending state", {
        style: {
          background: "rgba(242, 244, 252, 0.7)",
          borderLeft: "6px solid #F7B12F ",
          borderRadius: "4px 0px 0px 4px",
          color: "#2B2B2B",
          paddingBlock: "20px",
        },
      })
    }
  }
  const onReject = (payment: TraineeStatus) => {
    if (payment.is_rejected != true) {
      dispatch(rejectTrainee(payment))
    }
    if (payment.is_rejected) {
      toast("The Trainee is already in Rejected state", {
        style: {
          background: "rgba(242, 244, 252, 0.7)",
          borderLeft: "6px solid #F7B12F ",
          borderRadius: "4px 0px 0px 4px",
          color: "#2B2B2B",
          paddingBlock: "20px",
        },
      })
    }
  }
  const columns: ColumnDef<Finance>[] = [
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
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => (
        <div className='capitalize'>{`${format(
          new Date(row.getValue("created_at")),
          "MMMM d yyyy"
        )}`}</div>
      ),
    },

    {
      accessorKey: "first_name",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            First Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("first_name")}</div>
      ),
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Father Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("last_name")}</div>
      ),
    },
    {
      accessorKey: "training",
      header: "Training",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("training")}</div>
      ),
    },
    {
      accessorKey: "bank_name",
      header: "Bank Name",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("bank_name")}</div>
      ),
    },
    {
      accessorKey: "trans_num",
      header: "Transaction Number",
      cell: ({ row }) => <div>{row.getValue("trans_num")}</div>,
    },
    {
      accessorKey: "is_completed",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`capitalize px-3 py-[2px]  rounded-sm cursor-pointer text-center ${assignColor(
            row.original
          )}`}>
          {row.original.is_rejected
            ? "Rejected"
            : row.original.is_completed
            ? "Completed"
            : "Pending"}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("amount") + " " + "ETB"}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const payment = row.original

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                  disabled={
                    isUpdatingLoading ||
                    isRejectingLoading ||
                    isSettingToPendingLoading
                  }>
                  <MoreHorizontal className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() => onUpdate(payment)}
                  className='text-[#00B69B] focus:text-[#00B69B]'>
                  <Pencil className='h-4 w-4 mr-2 text-[#00B69B]' />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onReject(payment)}
                  className='text-red-600 focus:text-red-600'>
                  <GitPullRequestClosed className='h-4 w-4 mr-2 text-red-600' />
                  Reject
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onPending(payment)}
                  className='text-[#F7B12F] focus:text-[#F7B12F]'>
                  <ArrowUpZA className='h-4 w-4 mr-2 text-[#F7B12F]' />
                  Set to pending
                </DropdownMenuItem>
                {/* Dialog for Delete Payment - for future use */}

                {/* <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <Trash className='h-4 w-4 mr-2' />
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger> */}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Dialog for Delete Payment - for future use */}
            {/* <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle className='text-center'>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  {payment.first_name + " " + payment.last_name}?
                </DialogDescription>
              </DialogHeader>
              <div className='bg-[#FFE9D9] border-l-8 py-6 px-3 border-l-[#FF1A1A]'>
                <p className='text-[#BC4C2E]'>
                  By Deleteing this user, you won’t be able to get{" "}
                  {payment.first_name + " " + payment.last_name}'s data again.
                </p>
              </div>
              <DialogFooter className='w-full mt-2 flex !items-center !justify-between'>
                <Button
                  onClick={() => onDelete(payment)}
                  type='submit'
                  className='bg-[#FF0000] hover:bg-[#FF0000]/75'>
                  Yes,Delete
                </Button>
              </DialogFooter>
            </DialogContent> */}
          </Dialog>
        )
      },
    },
  ]

  useEffect(() => {
    const filter = { isCompleted: "", isRejected: "true" }

    dispatch(getTraineePaymentList({ page, filter }))
    if (isUpdatingSuccess) {
      toast.success("You've approved the trainee")
    }
    if (isRejectingSuccess) {
      toast.success("You've Rejected the trainee")
    }
    if (isSettingToPendingSuccess) {
      toast.success("You've Setted the trainee to pending state")
    }

    dispatch(reset())
  }, [
    dispatch,
    isRejectingSuccess,
    isSettingToPendingSuccess,
    isUpdatingSuccess,
    page,
  ])

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const componentRef = React.useRef<HTMLDivElement | null>(null)
  const handlePrint = usePrint(componentRef)
  return (
    <Layout>
      {data && (
        <div className='w-full border p-6 mt-8 rounded-md'>
          <h1 className='font-medium text-base md:text-xl leading-7 dark:text-white'>
            {title}
          </h1>
          <div className='flex items-center py-4'>
            <div className='ml-auto flex flex-col gap-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto'>
                    Columns <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='capitalize'
                          checked={column.getIsVisible()}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onCheckedChange={(value: any) =>
                            column.toggleVisibility(!!value)
                          }>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                placeholder='Filter by first name...'
                value={
                  (table.getColumn("first_name")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("first_name")
                    ?.setFilterValue(event.target.value)
                }
                className='max-w-sm'
              />
            </div>
          </div>
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
      )}
    </Layout>
  )
}
