import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
export default function App() {
  return (
      <>
        <div className="App overflow-x-hidden mb-10">
          <Navbar/>
          <Outlet/>
        </div>
      </>
  )
}
