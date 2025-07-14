import { Link } from "react-router-dom"
import { FaStar } from '../utils/icones.js'
import notFound from '../../public/notFound.webp'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { getYear } from "../utils/format"

export default function Card({ item, showLink = true }) {
  const urlImg = import.meta.env.VITE_IMG

  // Define título e data flexível (filme ou série)
  const title = item.title || item.name || "Título desconhecido"
  const date = item.release_date || item.first_air_date || ""

  // Define o tipo da mídia para gerar o link (tv = série)
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie")

  return (
    <>
      <div
        className="card bg-primaryBlack shadow-sm backdrop-blur-xl drop-shadow-xl"
        style={{ width: "24rem", height: "50rem" }}
      >
        {item.poster_path ? (
          <img
            src={urlImg + item.poster_path}
            className="card-img-top mt-4 rounded-md"
            alt={title}
          />
        ) : (
          <img
            src={notFound}
            alt="Imagem não encontrada..."
            className="card-img-top mt-4 rounded-md"
          />
        )}

        <div className="card-body">
          <h2 className="card-title h4 inline">
            {title} {getYear(date)}
          </h2>
          <p className="card-text flex align-middle items-center mt-3 h5">
            <FaStar className="inline text-primaryYellow w-10 text-xl" />
            {item.vote_average === 0
              ? "Não existe avaliação"
              : item.vote_average.toFixed(1)}
          </p>

          {showLink && (
            <Link to={`/${mediaType}/${item.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="btn border-2 p-2 font-bold bg-primaryRed fixed-bottom d-block w-50 mx-auto mb-4 hover:text-primaryRed hover:border-primaryRed"
              >
                Detalhes
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
