import { ReactNode } from "react"

const BotLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='max-w-lg mx-auto min-h-full py-16 px-8 !relative bg-linePattern bg-no-repeat bg-cover   '>
      <div className='border rounded-2xl  p-8 bg-white  flex flex-col w-full items-center'>
        <div className='pt-24 w-full flex flex-col items-center gap-4'>
          <img src='/logo-2.jpg' alt='Logo' className=' -mt-14 w-3/5 ' />
        </div>

        {children}
      </div>
      <img
        src='/top-oval.svg'
        alt='SVG'
        className='absolute top-0 right-0 -z-10'
      />
      <img
        src='/bottom-oval.svg'
        alt='SVG'
        className='absolute bottom-0 left-0 -z-10'
      />
    </div>
  )
}

export default BotLayout
