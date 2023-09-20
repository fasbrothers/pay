import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function RootLayout(){
  const token = localStorage.getItem("token")
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
