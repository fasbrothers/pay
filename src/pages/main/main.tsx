
function Main() {
  return (
    <div>
      <h1>Main</h1>
      <button onClick={()=> localStorage.removeItem("token")}>Logout</button>
    </div>
  )
}

export default Main