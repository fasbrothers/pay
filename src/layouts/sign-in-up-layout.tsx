import { Outlet } from 'react-router-dom'
import { SignSidebar } from '../components/sign-sidebar'

export default function SignInUpLayout() {
  return (
    <div >
      <div className="flex flex-col-reverse min:h-screen md:flex-row mx-auto">
      <Outlet />
      <SignSidebar />
      </div>
    </div>
  )
}
