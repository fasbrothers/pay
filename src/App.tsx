import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";

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