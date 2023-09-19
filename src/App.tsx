import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import './utils/generateUniqueId'

function App() {
  return (
    <BrowserRouter>
        <div >
            <Routes />
        </div>
    </BrowserRouter>
  )
}

export default App