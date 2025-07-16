// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
//ícone e imagem
import { FaStar } from '../utils/icones.js'
import notFound from '../assets/notFound.webp' 
//função
import { getYear } from "../utils/format"

export default function Card({ item, showLink = true }) {
  // Define a URL base para as imagens
  const urlImg = import.meta.env.VITE_IMG

  // Define título e data flexível (filme ou série)
  const title = item.title || "Série - "+item.name || "Título desconhecido"
  const date = item.release_date && item.release_date !== 0 ? item.release_date : item.first_air_date || ""


  // Define o tipo da mídia para gerar o link (tv = série)
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie")

  return (
    <>
      <div className="card dark:bg-primaryBlack bg-tertiaryBlack shadow-sm backdrop-blur-xl drop-shadow-xl" style={{ width: "20rem", height: "50rem" }}>

        {/* Exibe a imagem do filme ou série */}
        {item.poster_path ? (<img src={urlImg + item.poster_path} className="card-img-top mt-4 rounded-md" alt={title}/>) : 
        (<img src={notFound} alt="Imagem não encontrada..." className="card-img-top mt-4 rounded-md" />)}

        <div className="card-body">
          {/* Exibe o título e a data */}
          <h2 className="card-title h4 inline">
            {title} {date != 0 ? <span className="dark:text-tertiaryBlack text-secundaryBlack">{getYear(date)}</span>: ""}
          </h2>

          <p className="card-text flex align-middle text-secundaryBlack dark:text-white items-center mt-3 h5">
            <FaStar className="inline text-primaryYellow  w-10 text-xl" />
            {item.vote_average === 0 ? "Não existe avaliação" : item.vote_average.toFixed(1)}
          </p>

          {showLink && (
            <Link to={`/${mediaType}/${item.id}`}>
              {/* Botão de detalhes com animação */}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} className="btn border-2 p-2 font-bold text-primaryBlack dark:text-primaryWhite bg-primaryYellow dark:bg-primaryRed fixed-bottom d-block w-50 mx-auto mb-4 dark:hover:text-primaryRed
              dark:hover:border-primaryRed
              dark:hover:bg-transparent
              hover:text-primaryYellow hover:border-primaryYellow">Detalhes</motion.button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
