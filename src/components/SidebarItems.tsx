// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { SIDEBAR_ITEMS } from "@/constants"
import { getMe, logout, reset } from "@/features/auth/authSlice"
import { ChevronDown, Landmark, Users } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React, { useEffect } from "react"
const SidebarItems = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpenTwo, setIsOpenTwo] = React.useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { admin } = useAppSelector((state) => state.auth)
  useEffect(() => {
    // @ts-expect-error: Unreachable code error
    dispatch(getMe())
  }, [dispatch])
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/auth/login")
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const SubMenu = ({ item }) => {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className=' space-y-2'>
        <div className='w-full'>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='flex items-center justify-start gap-3 w-full h-full  hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 hover:by-4 text-sm font-medium text-gray-900 my-1 transition-all  hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950'>
              <Users className='text-white' />
              <p className=' text-white font-normal text-base leading-5 cursor-pointer'>
                {item.label}
              </p>

              {
                <ChevronDown
                  className={`text-white ${
                    isOpen && "rotate-180 transition-all duration-100"
                  }`}
                />
              }
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent
          className='space-y-2'
          onClick={() => setIsOpen(true)}>
          {item.isExpandable &&
            item.children.map((child) => (
              <Link
                onClick={() => setIsOpen(true)}
                className={` ${
                  pathname == child.path
                    ? " bg-white/10  border-l-2 border-[#F7B12F] "
                    : ""
                } flex items-center gap-3   hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 text-sm font-medium text-gray-900 my-1 transition-all  hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 ml-6 `}
                to={child?.path}
                key={child?.key}>
                <img
                  src={child?.icon}
                  alt={child?.key}
                  className={` ${
                    child?.key == "users" || child?.key == "trainee"
                      ? "w-[15px]"
                      : "w-[25px]"
                  }  `}
                />
                <p className=' text-white font-normal text-base leading-5 cursor-pointer'>
                  {child?.label}
                </p>
              </Link>
            ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }
  const SubMenuTwo = ({ item }) => {
    return (
      <Collapsible
        open={isOpenTwo}
        onOpenChange={setIsOpenTwo}
        className=' space-y-2'>
        <div className='w-full'>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='flex items-center justify-start gap-3 w-full h-full  hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 hover:by-4 text-sm font-medium text-gray-900 my-1 transition-all  hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950'>
              <Landmark className='text-white' />
              <p className=' text-white font-normal text-base leading-5 cursor-pointer'>
                {item.label}
              </p>

              {
                <ChevronDown
                  className={`text-white ${
                    isOpenTwo && "rotate-180 transition-all duration-100"
                  }`}
                />
              }
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent
          className='space-y-2'
          onClick={() => setIsOpenTwo(true)}>
          {item.isExpandableTwo &&
            item.children.map((child) => (
              <Link
                onClick={() => setIsOpenTwo(true)}
                className={` ${
                  pathname == child.path
                    ? " bg-white/10  border-l-2 border-[#F7B12F] "
                    : ""
                } flex items-center gap-3   hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 text-sm font-medium text-gray-900 my-1 transition-all  hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 ml-6 `}
                to={child?.path}
                key={child?.key}>
                <Landmark className='text-white' />

                <p className=' text-white font-normal text-base leading-5 cursor-pointer'>
                  {child?.label}
                </p>
              </Link>
            ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <>
      <div className='flex flex-col h-full'>
        {SIDEBAR_ITEMS.map((item) => (
          <div key={item.key}>
            {item.isExpandable ? (
              <SubMenu item={item} key={item.key} />
            ) : item.isExpandableTwo ? (
              <SubMenuTwo item={item} key={item.key} />
            ) : (
              <Link
                className={` ${
                  pathname == item.path
                    ? " bg-white/10  border-l-2 border-[#F7B12F] "
                    : ""
                } flex items-center gap-3   hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 text-sm font-medium text-gray-900 my-1 transition-all  hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 ${
                  item.key == "users" || item.key == "trainee" ? "ml-6" : ""
                } `}
                to={item.path}
                key={item.key}>
                <img
                  src={item.icon}
                  alt={item.key}
                  className={` ${
                    item.key == "users" || item.key == "trainee"
                      ? "w-[15px]"
                      : "w-[25px]"
                  }  `}
                />
                <p className=' text-white font-normal text-base leading-5 cursor-pointer'>
                  {item.label}
                </p>
              </Link>
            )}
          </div>
        ))}
        <div className='flex flex-col mt-auto'>
          <Link
            className={`${
              pathname == "/setting"
                ? "bg-white/10  border-l-2 border-[#F7B12F]"
                : " "
            } flex items-center gap-3   hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 text-sm font-medium text-gray-900 transition-all my-1 hover:bg-white/10 focus:outline-none focus-visible:ring-2`}
            to='/setting'>
            <img
              src='/dashboard/setting.svg'
              alt='setting icon'
              className='w-[25px] ]'
            />
            <p className='text-white font-normal text-base leading-5  cursor-pointer'>
              Settings
            </p>
          </Link>

          <hr />
          <button
            className='flex items-center my-4   justify-between gap-3   hover:border-l-2 hover:border-[#F7B12F] rounded-md bg-transparent px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2'
            onClick={onLogout}>
            <div className='flex flex-col text-white py-3'>
              <p className='text-base  dark:text-white '>
                {admin?.first_name + " " + admin?.middle_name}{" "}
              </p>
              <p className='text-sm  text-white '>Staff member</p>
            </div>

            <img
              src='/dashboard/sign-out.svg'
              alt='sign out icon'
              className='w-[25px] text-primary md:text-white  '
            />
          </button>
        </div>
      </div>
    </>
  )
}
export default SidebarItems
