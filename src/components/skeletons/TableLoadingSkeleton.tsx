import { Skeleton } from "@/components/ui/skeleton"

export default function TableLoadingSkeleton() {
  return (
    <div className='border rounded-lg w-full'>
      <div className='relative w-full overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                <Skeleton className='h-4 w-20' />
              </th>
              <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                <Skeleton className='h-4 w-20' />
              </th>
              <th className='px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400'>
                <Skeleton className='h-4 w-20' />
              </th>
              <th className='px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400'>
                <Skeleton className='h-4 w-20' />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-t border-gray-200 dark:border-gray-800'>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3 text-right'>
                <Skeleton className='h-6 w-full' />
              </td>
            </tr>
            <tr className='border-t border-gray-200 dark:border-gray-800'>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3 text-right'>
                <Skeleton className='h-6 w-full' />
              </td>
            </tr>
            <tr className='border-t border-gray-200 dark:border-gray-800'>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3 text-right'>
                <Skeleton className='h-6 w-full' />
              </td>
            </tr>
            <tr className='border-t border-gray-200 dark:border-gray-800'>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3 text-right'>
                <Skeleton className='h-6 w-full' />
              </td>
            </tr>
            <tr className='border-t border-gray-200 dark:border-gray-800'>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3'>
                <Skeleton className='h-6 w-full' />
              </td>
              <td className='px-4 py-3 text-right'>
                <Skeleton className='h-6 w-full' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
