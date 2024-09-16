import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
  Plus,
  Trash,
} from "lucide-react"
import * as React from "react"

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
import { Trainee } from "@/features/account/accountService"
import { cn } from "@/lib/utils"
import { exportToCSV, exportToExcel, usePrint } from "@/utils/utils"
import { Search } from "lucide-react"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import {
  deleteUser,
  getAllTrainees,
  reset,
} from "../../../features/account/accountSlice"
import TableLoadingSkeleton from "../../skeletons/TableLoadingSkeleton"
export type TraineeResults = {
  account_options: string
  bank_name: string
  city: string
  country: string
  email: string
  first_name: string
  gender: string
  id: string
  last_name: string
  middle_name: string
  phone_number: string
  register_date: string
  training: string
  training_type: string
  trans_num: string
}

export default function RecentTraineeRegisteration({
  title,
}: {
  title: string
}) {
  const navigate = useNavigate()
  const [page, setPage] = React.useState(1)
  const {
    trainees,
    isError,
    isDeletingUserLoading,
    isDeletingUserSuccess,
    isLoading,
    isSuccess,
    message,
  } = useAppSelector((state) => state.account)
  const [value, setValue] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const { admin } = useAppSelector((state) => state.auth)

  const [data, setData] = React.useState<Trainee[]>([])
  const { count } = trainees

  useEffect(() => {
    if (isSuccess) {
      setData(trainees?.results)
    }
  }, [isSuccess, trainees?.results])
  const onPrevious = () => {
    setPage((prevPage) => (prevPage ? prevPage - 1 : 1))
  }
  const onNext = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const columns: ColumnDef<Trainee>[] = [
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
      accessorKey: "first_name",
      enableSorting: true,
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
      accessorKey: "middle_name",
      enableSorting: true,

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
        <div className='capitalize'>{row.getValue("middle_name")}</div>
      ),
    },

    {
      accessorKey: "phone_number",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("phone_number")}</div>
      ),
    },
    {
      accessorKey: "training_type",
      header: "Training",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("training_type")}</div>
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
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("trans_num")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const trainee = row.original

        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                  disabled={isDeletingUserLoading}>
                  <MoreHorizontal className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(
                      `/dashboard/account/update/trainee/${trainee.phone_number}`
                    )
                  }>
                  <Pencil className='h-4 w-4 mr-2' />
                  update
                </DropdownMenuItem>

                <AlertDialogTrigger asChild>
                  {admin.is_superuser && (
                    <DropdownMenuItem className='text-destructive hover:text-destructive'>
                      <Trash className='h-4 w-4 mr-2 text-destructive' />
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
                  This action cannot be undone. This will permanently delete{" "}
                  {trainee.first_name +
                    " " +
                    trainee.middle_name +
                    " " +
                    trainee.last_name}{" "}
                  and remove its data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className='bg-destructive hover:bg-destructive/85'>
                  <Button
                    className='w-full bg-destructive hover:bg-destructive/85'
                    onClick={() => dispatch(deleteUser(trainee.phone_number))}>
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
    if (isDeletingUserSuccess) {
      toast.success("You've successfully deleted the trainee.")
    }
    const filter = { first_name: "", phone_number: "" }
    if (firstName) filter.first_name = firstName
    if (phoneNumber) filter.phone_number = phoneNumber

    dispatch(getAllTrainees({ page, filter }))

    return () => {
      dispatch(reset())
    }
  }, [
    isError,
    message,
    isDeletingUserSuccess,
    dispatch,
    page,
    phoneNumber,
    firstName,
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
    getRowId: (row) => row.phone_number.toString(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  console.log("rows", table.getSelectedRowModel())

  const status = [
    {
      value: "phone_number",
      label: "Phone number",
    },
    {
      value: "first_name",
      label: "First name",
    },
    {
      value: "",
      label: "clear",
    },
  ]
  const [open, setOpen] = React.useState(false)
  const componentRef = React.useRef<HTMLDivElement | null>(null)
  const handlePrint = usePrint(componentRef)
  const handleDeleteSelectedRows = () => {
    table.getSelectedRowModel().rows.forEach((data) => {
      dispatch(deleteUser(data.id))
    })
  }
  return (
    <div className='w-full border p-6 mt-8 rounded-md'>
      <h1 className='capitalize text-xl font-semibold py-3'>{title}</h1>
      <div className='flex items-center py-4 gap-2'>
        {/* <Input
          placeholder='Filter by first name...'
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        /> */}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'>
              {value
                ? status.find((s) => s.value === value)?.label
                : "Search by..."}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder='Search status...' />
              <CommandEmpty>Nothng found.</CommandEmpty>
              <CommandGroup>
                {status.map((s) => (
                  <CommandItem
                    key={s.value}
                    value={s.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === s.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {s.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {table.getSelectedRowModel().rows.length >= 1 && (
              <Button disabled={isDeletingUserLoading} variant='destructive'>
                Deleted Selected rows
              </Button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                selected trainees data from our servers.
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
        {value == "phone_number" && (
          <div className='w-full max-w-sm relative ml-1'>
            <Search className='w-4 h-4 absolute left-2.5 top-2.5 text-gray-500 dark:text-gray-400' />
            <Input
              className='pl-8'
              placeholder='Search by phone number'
              type='search'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        )}
        {value == "first_name" && (
          <div className='w-full max-w-sm relative ml-1'>
            <Search className='w-4 h-4 absolute left-2.5 top-2.5 text-gray-500 dark:text-gray-400' />
            <Input
              className='pl-8'
              placeholder='Search by first name'
              type='search'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        )}
        <div className='ml-auto flex flex-col gap-4'>
          <Button
            onClick={() => navigate("/dashboard/account/trainee/register")}>
            <Plus className='text-white' /> Add new trainee{" "}
          </Button>
        </div>
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
