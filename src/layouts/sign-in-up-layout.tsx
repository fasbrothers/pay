import { Outlet } from 'react-router-dom'
import { SignSidebar } from '../components/sign-sidebar'

export function SignInUpLayout() {
  return (
    <div className="flex">
      <Outlet />
      <SignSidebar />
    </div>
  )
}
