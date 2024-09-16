import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='relative'>
      <img
        src='/dashboard/login-bg.svg'
        alt='svg'
        className='absolute top-0 right-0 -z-10 h-96'
      />
      <div className='container mx-auto flex flex-col items-center pt-32'>
        <img src='/dashboard/login-logo.svg' alt='MultiSolution logo' />
        {children}
      </div>
    </div>
  )
}
