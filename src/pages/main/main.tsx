import { useNavigate } from "react-router-dom"
import { removeToken } from "../../utils/cookies"

function Main() {
  const navigate = useNavigate()

  const handleLogout = () =>{
    removeToken()
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