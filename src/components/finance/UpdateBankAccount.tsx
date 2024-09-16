import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import { z } from "zod"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { GetBankAccountsResponseData } from "@/features/finance/financeService"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { updateBankAccount } from "@/features/finance/financeSlice"
import toast from "react-hot-toast"
import { CircleLoader } from "react-spinners"

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

const UpdateBankAccount = ({
  selectedBankAccount,
}: {
  selectedBankAccount: GetBankAccountsResponseData
}) => {
  const [isHidden, setIsHidden] = useState(true)
  const dispatch = useAppDispatch()
  const { isUpdatingBankAccountLoading, isUpdatingBankAccountSuccess } =
    useAppSelector((state) => state.finance)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const data = {
      id: selectedBankAccount.id,
      account_number: values.accountNumber,
      account_name: values.accountName,
      bank_name: values.bankName,
    }
    dispatch(updateBankAccount(data))
  }
  useEffect(() => {
    if (isUpdatingBankAccountSuccess) {
      toast.success(
        `You've updated ${selectedBankAccount.bank_name}'s  bank account info successfully.`
      )
    }
  }, [isUpdatingBankAccountSuccess, selectedBankAccount.bank_name])
  useEffect(() => {
    form.setValue("accountName", selectedBankAccount.account_name)
    form.setValue("accountNumber", selectedBankAccount.account_number)
    form.setValue("bankName", selectedBankAccount.bank_name)
  }, [
    form,
    selectedBankAccount.account_name,
    selectedBankAccount.account_number,
    selectedBankAccount.bank_name,
  ])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full lg:w-2/3 space-y-6 border rounded-md p-8'>
        <p className='text-[#263238] dark:text-white font-normal text-base leading-7'>
          update your bank account information carefully below.
        </p>
        <div className='flex flex-col items-center  justify-between gap-3 w-full'>
          <FormField
            control={form.control}
            name='bankName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input disabled placeholder='Bank Name' {...field} />
                </FormControl>

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
              <FormLabel>Account Number</FormLabel>
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
                    <span className='sr-only'>Toggle password visibility</span>
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
            disabled={isUpdatingBankAccountLoading}>
            {isUpdatingBankAccountLoading ? (
              <CircleLoader
                color='#ffffff'
                size={30}
                loading={isUpdatingBankAccountLoading}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            ) : (
              <div>Update Account</div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateBankAccount
