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
import { GetBankAccountsResponseData } from "@/features/finance/financeService"
import {
  deleteBankAccount,
  getBankAccountsList,
  reset,
} from "@/features/finance/financeSlice"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
import { Button } from "../ui/button"
type setSelectedBankAccountAction = Dispatch<
  SetStateAction<GetBankAccountsResponseData>
>
type setSelectedIndexAction = Dispatch<SetStateAction<number>>
interface Props {
  setSelectedBankAccount: setSelectedBankAccountAction
  selectedBankAccount: GetBankAccountsResponseData
  setSelectedIndex: setSelectedIndexAction
}
const BankAccounts = ({
  selectedBankAccount,
  setSelectedBankAccount,
  setSelectedIndex,
}: Props) => {
  const { admin } = useAppSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  console.log("value ", value)
  const dispatch = useAppDispatch()
  const {
    bankAccounts,
    isUpdatingBankAccountSuccess,
    isDeletingBankAccountLoading,
    isDeletingBankAccountSuccess,
  } = useAppSelector((state) => state.finance)
  const bank = bankAccounts?.find(
    (bank) => bank.bank_name.toLocaleLowerCase() == value
  )
  useEffect(() => {
    if (isDeletingBankAccountSuccess)
      toast.success(
        `You've Deleted ${selectedBankAccount.bank_name}'s Account Info successfully.`
      )
  }, [isDeletingBankAccountSuccess, selectedBankAccount?.bank_name])
  useEffect(() => {
    dispatch(getBankAccountsList())
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    setSelectedBankAccount((prevData) => ({
      ...prevData,

      id: bank?.id,
      account_number: bank?.account_number,
      account_name: bank?.account_name,
      bank_name: bank?.bank_name,
    }))

    console.log("logging")

    dispatch(reset())
  }, [
    bank?.account_name,
    bank?.account_number,
    bank?.bank_name,
    bank?.id,
    dispatch,
    setSelectedBankAccount,
    isUpdatingBankAccountSuccess,
    isDeletingBankAccountSuccess,
  ])
  console.log(
    "slected Bank Account ",
    selectedBankAccount.bank_name == undefined
  )
  console.log("slected Bank Account ", selectedBankAccount.bank_name)

  return (
    <div className='space-y-6 w-full  lg:w-1/3 '>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between dark:text-white'>
            {value
              ? bankAccounts?.find(
                  (bank: { bank_name: string }) =>
                    bank.bank_name.toLocaleLowerCase() === value
                )?.bank_name
              : "Select Bank Account..."}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full dark:text-white p-0'>
          <Command>
            <CommandInput placeholder='Search Bank accounts...' />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {bankAccounts?.map((bank) => (
                <CommandItem
                  key={bank.id}
                  value={bank.bank_name}
                  onSelect={(currentValue: React.SetStateAction<string>) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === bank.bank_name.toLocaleLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {bank.bank_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='border  rounded-md py-8 px-4 '>
        <img src='/dashboard/bank-card.svg' alt='bank card image' />
        <div className='space-y-4 mb-3'>
          <p className='text-[#121212] dark:text-white font-semibold text-lg leading-6'>
            Account Information
          </p>
          <div className='flex items-center justify-between'>
            <p className='font-normal dark:text-white text-[#344055] leading-6'>
              Bank Name
            </p>
            <p className='font-normal text-[#344055] dark:text-white leading-6'>
              {selectedBankAccount.bank_name}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='font-normal dark:text-white text-[#344055] leading-6'>
              Account No.
            </p>
            <p className='font-normal text-[#344055] dark:text-white leading-6'>
              {selectedBankAccount.account_number}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='font-normal text-[#344055]  dark:text-white leading-6'>
              Account Name
            </p>
            <p className='font-normal text-[#344055] dark:text-white leading-6'>
              {selectedBankAccount.account_name}
            </p>
          </div>
        </div>

        <Button
          onClick={() => setSelectedIndex(2)}
          className='w-full my-2'
          variant={"outline"}
          disabled={
            selectedBankAccount.bank_name == "" ||
            selectedBankAccount.bank_name == undefined ||
            selectedBankAccount.bank_name == null
          }>
          Update Bank Account Info
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            {admin.is_superuser && (
              <Button
                className='w-full my-2'
                variant={"destructive"}
                disabled={
                  selectedBankAccount.bank_name == "" ||
                  selectedBankAccount.bank_name == undefined ||
                  selectedBankAccount.bank_name == null ||
                  isDeletingBankAccountLoading
                }>
                {isDeletingBankAccountLoading ? (
                  <CircleLoader
                    color='#ffffff'
                    size={30}
                    loading={isDeletingBankAccountLoading}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                  />
                ) : (
                  <div>Delete Bank Account Info</div>
                )}
              </Button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                bank account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className='bg-destructive hover:bg-destructive/85'
                asChild>
                <Button
                  className=' bg-destructive hover:bg-destructive/85'
                  onClick={() =>
                    dispatch(deleteBankAccount(selectedBankAccount?.id))
                  }>
                  Continue
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default BankAccounts
