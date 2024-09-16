import * as XLSX from "xlsx"
import saveAs from "file-saver"
import Papa from "papaparse"
import { useReactToPrint } from "react-to-print"
import { MutableRefObject } from "react"
import { EthDateTime } from "ethiopian-calendar-date-converter"

export const formatToEthiopianDate = (value: Date) => {
  return EthDateTime.fromEuropeanDate(value)
}
export const exportToExcel = (data: unknown[], fileName: string) => {
  const wb = XLSX.utils.book_new()

  const ws = XLSX.utils.json_to_sheet(data)

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" })

  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `${fileName}.xlsx`
  )
}
export const exportToCSV = (tableData: unknown[], fileName: string) => {
  const csv = Papa.unparse(tableData)

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })

  saveAs(blob, `${fileName}.csv`)
}

export const usePrint = (
  componentRef: MutableRefObject<HTMLDivElement | null>
) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return handlePrint
}
export function normalizePhoneNumber(phoneNumber: string) {
  if (phoneNumber.startsWith("2519") || phoneNumber.startsWith("2517")) {
    return phoneNumber
  } else if (phoneNumber.startsWith("07")) {
    return "2517" + phoneNumber.slice(2)
  } else if (phoneNumber.startsWith("09")) {
    return "2519" + phoneNumber.slice(2)
  } else {
    throw new Error("Invalid phone number prefix.")
  }
}
export const sliceFirstCharacter = (text: string) => {
  return text.slice(0, 1)
}
