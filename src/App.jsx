import { useState } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import AnimationIntro from './components/AnimationIntro'
import ScrollToTop from "./components/ScrollToTop"

import Footer from "./components/Footer"
export default function App() {
    const [showSplash, setShowSplash] = useState(true)
  return (
      <>
        <div className="App overflow-x-hidden mb-24">
          {showSplash && <AnimationIntro onFinish={() => setShowSplash(false)} />}
          <Navbar/>
          <Outlet/>
          <ScrollToTop />
          <Footer/>
        </div>
      </>
  )
}
