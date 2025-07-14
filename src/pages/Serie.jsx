import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsFillFileEarmarkTextFill, FaStar, FaCalendarAlt, FaUserGroup, MdTimer, IoMdArrowRoundBack, PiPopcornFill, IoStar,IoLayers, FaEarthAmericas } from '../utils/icones'
import { formatDate, formatHour, getYear, getCountryInfo } from "../utils/format"
import { useComeback } from "../hooks/useComeback"
import notFound from '../../public/notFound.webp'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const searchUrl = import.meta.env.VITE_URL_API_SERIES
const apiKey = import.meta.env.VITE_KEY_API
const imgSearch = import.meta.env.VITE_IMG

export default function Serie() {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [cast, setCast] = useState([])
  const handleComeback = useComeback()

  const getSerie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setSerie(data)
  }

  const getCredits = async () => {
    const res = await fetch(`${searchUrl}${id}/credits?${apiKey}`)
    const data = await res.json()
    const mainCast = data.cast.slice(0, 10)
    setCast(mainCast)
  }

  const getTrailer = async () => {
    const res = await fetch(`${searchUrl}${id}/videos?${apiKey}`)
    const data = await res.json()
    const trailer = data.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    )
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)
    }
  }

  useEffect(() => {
    const serieUrl = `${searchUrl}${id}?${apiKey}&language=pt-BR`
    getSerie(serieUrl)
    getTrailer()
    getCredits()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
    {console.log(serie)}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="row justify-center gap-4 mb-10">
          {serie && (
            <>
              <motion.div
                className="col-4"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <button className="card px-4 py-2 mt-5 bg-primaryBlack hover:bg-primaryRed" onClick={handleComeback}>
                    <IoMdArrowRoundBack />
                  </button>
                </motion.div>

                <motion.div
                  className="card mt-5 p-2 rounded-md bg-primaryBlack shadow-md"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 200 }}>
                  {serie.poster_path ? (
                    <motion.img
                      src={imgSearch + serie.poster_path}
                      className="card-img-top rounded-md mt-2"
                      alt={serie.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    />):(
                    <img src={notFound} alt="Imagem não encontrada..." className="card-img-top rounded-md mt-4" />)}

                  <ul className="list-group list-group-flush *:bg-primaryBlack">

                    <li className="list-group-item *:inline">
                      <h3 className="font-bold inline"><PiPopcornFill className="inline mb-1 text-primaryYellow mr-2"/> Gênero: </h3>
                      <p className="text-tertiaryBlack">
                        {serie.release_date !== 0 ? (
                          serie.genres.map((genre, index) => (
                            index === serie.genres.length - 1 ? genre.name : `${genre.name}/`))) : ("Não informado")}</p>
                    </li>

                    <li className="list-group-item *:inline">
                      <h3 className="font-bold inline">
                        <FaCalendarAlt className="inline mb-1 text-primaryYellow mr-2" /> Estreia: </h3>
                      <p className="text-tertiaryBlack">{formatDate(serie.first_air_date)}</p>
                    </li>

                    <li className="list-group-item *:inline">
                    <h3 className="font-bold inline">
                      <IoLayers className="inline mb-1 text-primaryYellow mr-2" /> Temporadas: </h3>
                    <p className="text-tertiaryBlack">
                      {serie.number_of_seasons > 0 ? serie.number_of_seasons : "Não informado"}</p>
                  </li>

                  <li className="list-group-item *:inline">
                      <h3 className="font-bold inline">
                        <MdTimer className="inline mb-1 text-primaryYellow mr-2" /> Duração média por Epsódio: </h3>
                      <p className="text-tertiaryBlack">
                        {serie.episode_run_time.length > 0 ? formatHour( Math.floor( serie.episode_run_time.reduce((acc, dur) => acc + dur, 0) / serie.episode_run_time.length)): 'Não disponível'}</p>
                    </li>


                    <li className="list-group-item *:inline">
                      <h3 className="font-bold inline">
                        <FaEarthAmericas className="inline mb-1 text-primaryYellow mr-2" /> País de Origem: </h3>
                      <p className="text-tertiaryBlack">
                        {serie.origin_country.length > 0
                          ? serie.origin_country.map(getCountryInfo).join(", ")
                          : "Não disponível"}
                      </p>
                    </li>

                    <li className="list-group-item *:inline">
                      <p className="font-bold mt-3">
                        <IoStar className="inline mb-1 text-primaryYellow mr-2" />
                        Diretor: {" "}
                        <span className="text-tertiaryBlack">
                          {serie.created_by.length > 0
                            ? serie.created_by.map((diretor, index) =>
                                index === serie.created_by.length - 1
                                  ? diretor.name: `${diretor.name}, `): "Não informado"}
                        </span>
                      </p>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>

              <motion.div
                className="col-5 mt-32"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div className="card p-3 bg-primaryBlack" whileHover={{ scale: 1.01 }}>
                  <h2 className="card-title h4 inline">{serie.name} {getYear(serie.first_air_date)}</h2>
                  <p className="card-text flex align-middle items-center mt-3 h5">
                    <FaStar className="inline text-primaryYellow w-10 text-xl" />
                    {serie.vote_average === 0 ? "Não existe avaliação" : serie.vote_average.toFixed(1)}
                  </p>
                  <p className="tagline italic text-tertiaryBlack">{serie.tagline ? `"${serie.tagline}"` : ""}</p>
                </motion.div>

                {trailerUrl && (
                  <motion.div
                    className="trailer mt-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="card w-full h-72 md:h-96 rounded shadow"
                        src={trailerUrl}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>

                    <motion.div className="card mt-5 bg-primaryBlack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                      <div className="card-body">
                        <h2 className="font-bold mb-4">
                          <BsFillFileEarmarkTextFill className="inline text-primaryYellow mb-1 mr-2" /> Sinopse:
                        </h2>
                        <p>{serie.overview}</p>
                        <li className="list-group-item mt-3">
                          <h3 className="font-bold mt-3">
                            <FaUserGroup className="inline mb-1 mr-2 text-primaryYellow" /> Elenco principal: </h3>
                          <ul className="text-white text-sm list-disc pl-5 mt-2">
                            {cast.length > 0 ? (cast.map(actor => (<li key={actor.id}>{actor.name} / <span className="italic text-tertiaryBlack">{actor.character}</span></li>))) : (<li>Elenco não disponível</li>)}</ul>
                        </li>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}
