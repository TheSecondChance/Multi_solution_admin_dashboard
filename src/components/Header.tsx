import { useAppSelector } from "@/app/hooks"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SVGProps } from "react"
import { Link } from "react-router-dom"
import { JSX } from "react/jsx-runtime"
import SidebarItems from "./SidebarItems"
import ThemeToggler from "./ThemeToggler"
import { sliceFirstCharacter } from "@/utils/utils"

const Header = () => {
  const { admin } = useAppSelector((state) => state.auth)

  return (
    <header className='sticky top-0 z-10 flex h-16 w-full shrink-0 items-center  bg-white dark:bg-[#263238] px-4  '>
      <div className='flex-1'>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='lg:hidden' size='icon' variant='outline'>
              <MenuIcon className='h-6 w-6' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <div className='flex h-16 items-center justify-between px-4'>
              <Link className='flex items-center gap-2' to='#'>
                <img src='/dashboard/multi-solution-logo.svg' />
              </Link>
            </div>
            {/* For small screens */}
            <nav className='flex flex-col gap-1 px-4 py-6 min-h-screen  pb-20'>
              <SidebarItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex items-center gap-4'>
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Avatar>
                <AvatarFallback className='capitalize'>
                  {sliceFirstCharacter(admin?.first_name) +
                    " " +
                    sliceFirstCharacter(admin?.middle_name)}
                </AvatarFallback>
              </Avatar>
              <span className='sr-only'>User menu</span>
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Signed in as John Doe</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent> */}
        </DropdownMenu>
      </div>
    </header>
  )
}
function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}
export default Header
