import { UsersRound } from "lucide-react"

interface Props {
  totalNumber: number
  title: string
  icon: string
  increasingOrDecreasing?: string
  increasingOrDecreasingText?: string
  isRightBorderDisabled?: boolean
}
const StatusCard = ({
  totalNumber,
  title,
  icon,
  // increasingOrDecreasing,
  // increasingOrDecreasingText,
  isRightBorderDisabled,
}: Props) => {
  return (
    <div
      className={` space-y-3 px-3 mx-2 md:mx-0 border-b border-b-white lg:border-b-transparent ${
        isRightBorderDisabled ? " md:border-none" : "md:border-r"
      }  pb-8 pt-6 border-[#E6EDFF] my-2`}>
      <div className='flex justify-between items-start '>
        <div className='space-y-3'>
          <h1 className='text-3xl leading-10 font-semibold'>{totalNumber}</h1>
          <p className={`text-lg font-normal leading-6 ${icon}`}>{title}</p>
        </div>
        <UsersRound className={`${icon}`} />
      </div>
      {/* <div className='flex items-center gap-2'>
        <img src={increasingOrDecreasing} alt='icon' />
        <p className='text-[#7C8DB5] font-sm leading-5'>
          {increasingOrDecreasingText}
        </p>
      </div> */}
    </div>
  )
}

export default StatusCard
