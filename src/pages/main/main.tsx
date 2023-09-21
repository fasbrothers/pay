import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/redux-hooks"
import { deleteToken } from "../../store/slices/authSlice"

function Main() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () =>{
    dispatch(deleteToken())
    navigate("/auth")
  }
  return (
    <div>
      <h1>Main</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Main