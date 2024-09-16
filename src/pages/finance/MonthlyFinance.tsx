import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import BankAccounts from "@/components/finance/BankAccounts"
import MonthlyPaymentListTable from "@/components/tables/finance/MonthlyPaymentLIistTable"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GetBankAccountsResponseData } from "@/features/finance/financeService"
import { createBankAccount } from "@/features/finance/financeSlice"
import Layout from "@/layout/Layout"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"
import { BANK_OPTIONS } from "@/constants"
import UpdateBankAccount from "@/components/finance/UpdateBankAccount"

const FormSchema = z.object({
  accountName: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(2, {
    message: "Account number must be at least 2 characters.",
  }),
})

export default function MonthlyFinance() {
  const dispatch = useAppDispatch()
  const [isHidden, setIsHidden] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const [selectedBankAccount, setSelectedBankAccount] =
    useState<GetBankAccountsResponseData>({
      id: 0,
      account_number: "",
      account_name: "",
      bank_name: "",
    })
  const { isAddingBankAccountLoading, isAddingBankAccountSuccess } =
    useAppSelector((state) => state.finance)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(createBankAccount(data))
  }
  useEffect(() => {
    if (isAddingBankAccountSuccess) {
      toast.success("You've added new bank account successfully.")
    }
  }, [isAddingBankAccountSuccess])

  return (
    <Layout>
      <div className='flex gap-2 flex-wrap lg:flex-nowrap'>
        {selectedIndex == 1 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full lg:w-2/3 space-y-6 border rounded-md p-8'>
              <p className='text-[#263238] dark:text-white font-normal text-base leading-7'>
                Add your new account information carefully below.
              </p>
              <div className='flex flex-wrap lg:flex-nowrap items-center  justify-between gap-3 w-full'>
                <FormField
                  control={form.control}
                  name='bankName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Bank Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select the bank account' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='w-full'>
                          {BANK_OPTIONS?.map((bank) => (
                            <SelectItem key={bank.label} value={bank.label}>
                              {bank.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='accountName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Account Name' {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='accountNumber'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Transaction Number</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          className='pr-10'
                          id='password'
                          placeholder='Transaction Number'
                          {...field}
                          type={isHidden ? "password" : "text"}
                        />
                        <div
                          onClick={() => setIsHidden(!isHidden)}
                          className='absolute cursor-pointer right-2 top-1/2 -translate-y-1/2'>
                          {isHidden ? (
                            <Eye className='h-5 w-5' />
                          ) : (
                            <EyeOff className='h-5 w-5' />
                          )}
                          <span className='sr-only'>
                            Toggle password visibility
                          </span>
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex'>
                <Button
                  className='w-[125px] ml-auto bg-[#1E477B] hover:bg-[#1E477B]/85'
                  disabled={isAddingBankAccountLoading}>
                  {isAddingBankAccountLoading ? (
                    <CircleLoader
                      color='#ffffff'
                      size={30}
                      loading={isAddingBankAccountLoading}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    <div>Add Account</div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <UpdateBankAccount selectedBankAccount={selectedBankAccount} />
        )}
        <BankAccounts
          selectedBankAccount={selectedBankAccount}
          setSelectedBankAccount={setSelectedBankAccount}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      <MonthlyPaymentListTable title='Monthly Trainee Payment' />
    </Layout>
  )
}
