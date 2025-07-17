import { useState, useEffect } from "react"
import { FaArrowUp } from "../utils/icones"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  //monitora a visibilidade do botão
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    // Adiciona o listener de scroll
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  //tola pro topo de maneira suave
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    // Botão de voltar ao topo
    <div className="fixed bottom-24 right-6 z-50">
      {isVisible && (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <button onClick={scrollToTop} className="dark:bg-primaryYellow bg-primaryRed drop-shadow-sm backdrop-blur-sm shadow-2xl  border-2 border-primaryBlack text-black p-3 rounded-full dark:hover:bg-secondaryYellow hover:bg-secondaryRed hover:border-2 transition duration-300 ease-in-out" title="Voltar ao topo">
            <FaArrowUp size={20} />
          </button>
        </motion.div>
      )}                      
              
    </div>
  )
}
