import { Navigate, Outlet, useLocation } from "react-router-dom"
import { getToken } from "../utils/cookies"

export default function RootLayout(){

  const token = getToken()
  const { pathname} = useLocation()

  if(!token && !pathname.includes("auth")){
    return <Navigate to = "/auth" />
  }
  if(token && pathname.includes("auth")){
    return <Navigate to ="/" />
  }

  return (
      <Outlet />
  )
}
