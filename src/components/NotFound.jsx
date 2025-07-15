import { Link } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function NotFound() {
  return (

    <div className="bg-primaryWhite dark:bg-darkBack ">
      
      {/* //animação de fade-in para a página não encontrada */}
      <motion.div  className="flex flex-col items-center justify-center  mt-44 text-white px-4 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl font-bold dark:text-primaryYellow text-primaryRed mb-4">Oops!</h1>
        <p className="text-lg dark:text-tertiaryBlack text-secundaryBlack mb-6">Essa página não existe ou foi removida.</p>
        {/* Botão de voltar para a página principal */}
        <Link  to="/" className="inline-flex items-center gap-2 dark:bg-primaryYellow bg-primaryRed text-black font-bold px-6 py-2 rounded shadow dark:hover:bg-secondaryYellow hover:bg-secondaryRed transition-all">
          <IoMdArrowRoundBack /> Voltar para a home</Link>
      </motion.div>
    </div>
  )
}
