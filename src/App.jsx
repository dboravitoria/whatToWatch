import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
export default function App() {
  return (
      <>
        <div className="App overflow-x-hidden mb-24">
          <Navbar/>
          <Outlet/>
          <Footer/>
        </div>
      </>
  )
}
