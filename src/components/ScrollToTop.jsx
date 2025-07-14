import { useState, useEffect } from "react"
import { FaArrowUp } from "../utils/icones"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-primaryYellow drop-shadow-sm backdrop-blur-sm shadow-2xl  border-2 border-primaryBlack text-black p-3 rounded-full hover:bg-secondaryYellow hover:border-2 transition duration-300 ease-in-out"
          title="Voltar ao topo"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  )
}
