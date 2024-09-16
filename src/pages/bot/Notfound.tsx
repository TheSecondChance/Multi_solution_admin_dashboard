const Notfound = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-3'>
      <img src='/not-found.svg' alt='Not found' />
      <h1 className='font-bold font-cart md:font-extrabold text-2xl text-[#252F40] md:text-5xl'>
        Oh No! Error 404
      </h1>
      <p className='font-bold font-cart md:font-extrabold text-base md:text-2xl text-[#838DA0] text-center'>
        Oops! The page you're looking for can't be found.
      </p>
    </div>
  )
}

export default Notfound
