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
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Preference } from "@/features/account/accountService"
import { exportToCSV, exportToExcel, usePrint } from "@/utils/utils"
import { useEffect } from "react"
import {
  getPreferenceList,
  reset,
} from "../../../features/account/accountSlice"
import TableLoadingSkeleton from "../../skeletons/TableLoadingSkeleton"
import { Input } from "@/components/ui/input"

export default function PreferenceTable({ title }: { title: string }) {
  const [page, setPage] = React.useState(1)
  const { preferences, isError, isLoading, isSuccess, message } =
    useAppSelector((state) => state.account)
  const [data, setData] = React.useState<Preference[]>([])
  const { count } = preferences
  console.log(preferences)
  useEffect(() => {
    if (isSuccess) {
      setData(preferences?.results)
    }
  }, [isSuccess, preferences?.results])
  const onPrevious = () => {
    setPage((prevPage) => (prevPage ? prevPage - 1 : 1))
  }
  const onNext = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const columns: ColumnDef<Preference>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            ID
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div className='capitalize'>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "tg_id",
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Telegram Id
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("tg_id")}</div>
      ),
    },

    {
      accessorKey: "language",
      header: "Language",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("language")}</div>
      ),
    },
    {
      accessorKey: "bank",
      header: "Bank",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("bank")}</div>
      ),
    },
  ]

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
  }, [isError, message])
  useEffect(() => {
    dispatch(getPreferenceList({ page }))

    return () => {
      dispatch(reset())
    }
  }, [dispatch, page])

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
    <div className='w-full border p-6 mt-8 rounded-md'>
      <h1 className='capitalize text-xl font-semibold py-3'>{title}</h1>
      <div className='flex items-center py-4'></div>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
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
