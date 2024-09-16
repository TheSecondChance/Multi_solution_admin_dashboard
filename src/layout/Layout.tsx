import { Link } from "react-router-dom"
import { ReactNode } from "react"

import SidebarItems from "@/components/SidebarItems"
import Header from "@/components/Header"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='block   min-h-screen'>
      <div className='fixed top-0'>
        <div className=' sticky top-0 h-screen hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-primary '>
          <div className='flex h-16 items-center justify-between px-4'>
            <Link className='flex items-center gap-2' to='/'>
              <img
                src='/dashboard/multi-solution-logo-light.svg'
                className='block dark:hidden'
              />
              <img
                src='/dashboard/multi-solution-logo.svg'
                className='hidden dark:block'
              />
            </Link>
          </div>
          <nav className='flex flex-col gap-1 px-4 py-6 h-screen  pb-20'>
            <SidebarItems />
          </nav>
        </div>
      </div>
      <div className='flex-1 relative lg:ml-64 '>
        <Header />
        <main className='p-4  md:p-6 overflow-hidden  '>{children}</main>
      </div>
    </div>
  )
}
