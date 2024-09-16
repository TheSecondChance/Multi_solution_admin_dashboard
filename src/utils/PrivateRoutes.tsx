import { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const PrivateRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("authToken"))

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("authToken")
      setIsLoggedIn(!!token)
    }

    // Initial check
    checkAuth()

    // Check every second for changes to the authentication cookie
    const intervalId = setInterval(checkAuth, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return isLoggedIn ? <Outlet /> : <Navigate to='/auth/login' />
}

export default PrivateRoutes
