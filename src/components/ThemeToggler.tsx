import { useState } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

import { Button } from "./ui/button"

export default function ThemeToggler() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }
  return (
    <>
      <Button
        variant='outline'
        size='icon'
        className='rounded-full
'
        onClick={toggleDarkMode}>
        <SunIcon className=' h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <MoonIcon className=' absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      </Button>
    </>
  )
}
