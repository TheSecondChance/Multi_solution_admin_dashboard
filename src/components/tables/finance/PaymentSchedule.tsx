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
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import * as React from "react"
import { format } from "date-fns"

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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

import { MonthlyPaymentCycle } from "@/features/finance/financeService"
import {
  deleteMonthlyPaymentCycle,
  getMonthlyPaymentCycleList,
  reset,
} from "@/features/finance/financeSlice"
import { useNavigate } from "react-router-dom"
import TableLoadingSkeleton from "../../skeletons/TableLoadingSkeleton"
import toast from "react-hot-toast"

export default function PaymentSchedule({ title }: { title: string }) {
  const navigate = useNavigate()
  const { admin } = useAppSelector((state) => state.auth)
  const {
    monthlyPaymentCycleList: data,
    isError,
    isDeletingLoading,
    isDeletingSuccess,
    isLoading,

    message,
  } = useAppSelector((state) => state.finance)
  const assignColor = (status: MonthlyPaymentCycle) => {
    if (status.is_active == true) return "bg-[#CCF0EB] text-[#00B69B] "
    else return "bg-[#FCD7D4] text-[#EF3826]"
  }

  const columns: ColumnDef<MonthlyPaymentCycle>[] = [
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
      accessorKey: "opening_date",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Opening Date
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='capitalize'>{`${
          data.length > 0 &&
          format(
            new Date(row.getValue("opening_date") || Date.now()),
            "MMMM d yyyy"
          )
        }`}</div>
      ),
    },
    {
      accessorKey: "closing_date",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Closing Date
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='capitalize'>{`${
          data.length > 0 &&
          format(
            new Date(row.getValue("closing_date") || Date.now()),
            "MMMM d yyyy"
          )
        }`}</div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`${assignColor(
            row.original
          )} py-1 text-center rounded-sm`}>
          {row.original.is_active ? "Active" : "Not Active"}
        </div>
      ),
    },

    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const paymentCycle = row.original
        console.log(paymentCycle)
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-50'
                  size='icon'
                  variant='ghost'>
                  <MoreHorizontal className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  disabled={isDeletingLoading}
                  className='text-[#00B69B] focus:text-[#00B69B]'
                  onClick={() =>
                    navigate(
                      `/dashboard/finance/update/monthly-schedule/${paymentCycle.id}`
                    )
                  }>
                  <Pencil className='h-4 w-4 mr-2 text-[#00B69B]' />
                  update
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  {admin.is_superuser && (
                    <DropdownMenuItem
                      disabled={isDeletingLoading}
                      className='text-red-600 focus:text-red-600'>
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
                  This action cannot be undone. This will permanently delete and
                  remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-destructive hover:bg-destructive/85'>
                  <Button
                    className='w-full bg-destructive hover:bg-destructive/85'
                    onClick={() =>
                      dispatch(deleteMonthlyPaymentCycle(paymentCycle.id))
                    }>
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      },
    },
  ]

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isDeletingSuccess) {
      toast.success("You've successfully delete the monthlyc cycle")
    }
    dispatch(getMonthlyPaymentCycleList())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, isDeletingSuccess, dispatch])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    data,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment

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
  return (
    <div className='w-full border p-6 mt-8 rounded-md'>
      <h1 className='capitalize text-xl font-semibold py-3'>{title}</h1>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by opening date..'
          value={
            (table.getColumn("opening_date")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("opening_date")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className='rounded-md border'>
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
    </div>
  )
}
