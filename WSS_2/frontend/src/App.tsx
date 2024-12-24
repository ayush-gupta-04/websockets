import { BrowserRouter, Route, Routes } from "react-router-dom"
import User from "./components/user"

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/user/:id" element = {<User></User>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
