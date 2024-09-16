import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Notfound = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3'>
      <img src='/dashboard/not-found.svg' alt='Not found' />
      <h1 className='font-bold font-cart md:font-extrabold text-2xl text-[#252F40] md:text-5xl'>
        Oh No! Error 404
      </h1>
      <p className='font-bold font-cart md:font-extrabold text-base md:text-2xl text-[#838DA0]'>
        Oops! The page you're looking for can't be found.
      </p>
      <Link to='/'>
        {" "}
        <Button className='bg-[#1E477B]  text-white'>Back To Home</Button>
      </Link>
    </div>
  )
}

export default Notfound
