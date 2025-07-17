//hooks
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useComeback } from "../hooks/useComeback"
import { fetchDetails, fetchCredits, fetchTrailer } from "../services/mediaService"

//icones e imagem
import {BsFillFileEarmarkTextFill, FaStar, FaCalendarAlt, FaWallet, FaUserGroup, MdTimer, SlGraph, IoMdArrowRoundBack, IoStar, PiPopcornFill, FaEarthAmericas, FaCirclePlay} from '../utils/icones'
import notFound from '../assets/notFound.webp'

//funções de formatação
import { formatCurrency, formatDate, formatHour, getYear, getCountryInfo } from "../utils/format";

// eslint-disable-next-line no-unused-vars
import { motion  } from "framer-motion";

//variables de ambiente
const searchUrl = "https://api.themoviedb.org/3/movie/"
const apiKey = "api_key=24eb66121fdd14b703bdc7732d396c83"
const imgSearch = "https://image.tmdb.org/t/p/w500"

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState("")
  const [watchProviders, setWatchProviders] = useState([])
  const handleComeback = useComeback()

  // Efeito colateral para buscar os dados do filme, créditos e trailer
  useEffect(() => {
      const urlBase = `${searchUrl}${id}`
      const fetchMovieData = async () => {
        try {
          const data = await fetchDetails(`${urlBase}?${apiKey}&language=pt-BR`)
          setMovie(data)
          const credits = await fetchCredits(`${urlBase}`, 10)
          setCast(credits.cast)
          const directorName = credits.director || ""
          setDirector(directorName)
          const trailer = await fetchTrailer(`${urlBase}`)
          setTrailerUrl(trailer)

          // URL para buscar onde assistir
          const providerUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?${apiKey}`
          const response = await fetch(providerUrl)
          const providerData = await response.json()

          // Verifica se tem resultado pro Brasil
          const providersInBR = providerData.results?.BR?.flatrate || []
          setWatchProviders(providersInBR)
        } catch (error) {
          console.error("Erro ao buscar dados do filme:", error)
        }
      }
      fetchMovieData()
    }, [id])

  return (
    <>
      {/* Transição que faz os elementos aparecerem na tela de forma suave */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

        {/* Cria um layout grid pra separar as informações */}
        <div className="row justify-center gap-4 mb-10 mt-24">
          {movie && (
            <>
            {/* Lado esquerdo do grid */}
            <motion.div className="col-9 col-md-4 mt-5 mt-md-0" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>

              {/* Transição que faz aumentar o botão no hover */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                <button className="card px-4 py-2 mt-5 dark:bg-primaryBlack bg-tertiaryBlack dark:hover:bg-primaryRed hover:bg-primaryRed" onClick={handleComeback}>
                  <IoMdArrowRoundBack />
                </button>
              </motion.div>

              {/* Transição que aumenta um pouco o tamanho do poster */}
              <motion.div className="card mt-5 p-2 rounded-md dark:bg-primaryBlack bg-tertiaryBlack shadow-md" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 200 }}>
                {movie.poster_path ? (
                  <motion.img src={imgSearch + movie.poster_path} className="card-img-top rounded-md mt-2" alt={movie.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}transition={{ duration: 1 }} /> ) : (
                  <img src={notFound} alt="Imagem não encontrada..." className="card-img-top rounded-md mt-4" />
                )}

                {/* Lista de informações do filme, todas tratadas pra caso não retorne nada da API */}
                <ul className="list-group list-group-flush *:dark:bg-primaryBlack *:bg-tertiaryBlack *:inline">

                  {/* Traz uma lista de gêneros do filme */}
                  <li className="list-group-item *:inline">
                    <h3 className="font-bold inline"><PiPopcornFill className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2"/> Gênero: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack"> {movie.release_date !== 0 ? ( movie.genres.map((genre, index) => ( index === movie.genres.length - 1 ? genre.name : `${genre.name}/`))) : ("Não informado")}</p>
                  </li>

                  {/*Traz o dia do lançamento*/}
                  <li className="list-group-item *:inline">
                    <h3 className="font-bold inline"><FaCalendarAlt className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2"/> Lançamento: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack">{movie.release_date != 0 ? (formatDate(movie.release_date)) : ("Não informado")}</p>
                  </li>

                  {/* Traz o orçamento */}
                  <li className="list-group-item *:inline">
                    <h3 className="font-bold inline"><FaWallet className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Orçamento: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack">{movie.budget > 0 ? (formatCurrency(movie.budget)) : ("Não informado")}</p>
                  </li>

                  {/* Qual foi o ganho em média com o filme */}
                  <li className="list-group-item *:inline">
                    <h3 className="font-bold inline"><SlGraph className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2"/> Receita: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack">{movie.revenue > 0 ? (formatCurrency(movie.revenue)) : ("Não informado")}</p>
                  </li>

                  {/* Duração do filme formatado por hora e minutos */}
                  <li className="list-group-item *:inline">
                    <h3 className="font-bold inline"><MdTimer className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Duração: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack">{movie.runtime > 0 ? (formatHour(movie.runtime)) : ("Não informado")}</p>
                  </li>

                  {/* País de origem do filme, e traz a bandeirinha também */}
                  <li className="list-group-item *:inline">
                    <h3 className="font-bold inline">
                      <FaEarthAmericas className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> País de Origem: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack">
                      {movie.origin_country.length > 0 ? movie.origin_country.map(getCountryInfo).join(", ") : "Não disponível"}
                    </p>
                  </li>

                  {/* Diretor do filme, caso não tenha, traz "Não informado" */}
                  <li className="list-group-item *:inline">
                    <p className="font-bold mt-3"><IoStar className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2"/> Diretor: <span className="dark:text-tertiaryBlack text-neutral-700 ">{director || "Não informado"}</span></p>
                  </li>
                  <li className="list-group-item *:inline mt-2">
                  <h3 className="font-bold inline"><FaCirclePlay className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Onde assistir: </h3>
                  {watchProviders.length > 0 ? (
                    watchProviders.map((provider) => (
                      <img key={provider.provider_id} src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} title={provider.provider_name}className="inline w-10 h-10 mx-1"/>
                    ))
                  ) : (<p className="dark:text-tertiaryBlack text-secundaryBlack ml-1 inline">Não disponível</p> )}
                  </li>
                </ul>
              </motion.div>
            </motion.div>


            {/* Lado direito do grid */}
            <motion.div className="col-md-5 col-9 md:mt-32 mt-10" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>

              {/* Transição que faz aumentar o tamanho do card */}
              <motion.div className="card p-3 dark:bg-primaryBlack bg-tertiaryBlack" whileHover={{ scale: 1.01 }}>
                {/* Card com nome, ano, nota e slogam do filme */}
                <h2 className="card-title h4 inline">{movie.title} {movie.release_date > 0 ? (getYear(movie.release_date)) : ("")}</h2>
                <p className="card-text flex align-middle items-center mt-3 h5">
                  <FaStar className="inline text-primaryYellow w-10 text-xl"/>{movie.vote_average == 0 ? "Não existe avaliação" : (movie.vote_average.toFixed(1))}
                </p>
                <p className="tagline italic dark:text-tertiaryBlack text-secundaryBlack">{movie.tagline ? (`"${movie.tagline}"`) : ("")}</p>
              </motion.div>


              {/* Trailer do filme  */}
              {trailerUrl && (
                <motion.div className="trailer mt-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <div className="aspect-w-16 aspect-h-9">
                    {/* Iframe que traz o trailer do filme do Youtube */}
                    <iframe className="card w-full h-72 md:h-96 rounded shadow" src={trailerUrl} title="Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>

                  {/* Card com a sinopse e elenco do filme */}
                  <motion.div className="card mt-5 dark:bg-primaryBlack bg-tertiaryBlack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <div className="card-body">
                      <h2 className="font-bold mb-4">
                        <BsFillFileEarmarkTextFill className="inline  dark:text-primaryYellow text-primaryRed mb-1 mr-2" /> Sinopse:
                      </h2>
                      <p>{movie.overview}</p>
                      <li className="list-group-item mt-3">
                        <h3 className="font-bold mt-3"><FaUserGroup className="inline mb-1 mr-2 dark:text-primaryYellow text-primaryRed"/>Elenco principal:</h3>
                        {/* Lista de atores do filme, caso não tenha, traz "Não informado" */}
                        <ul className="dark:text-white text-secundaryBlack text-sm list-disc pl-5 mt-2">
                          {cast.length > 0 ? ( cast.map(actor => (<li key={actor.id}>{actor.name} / <span className="italic dark:text-tertiaryBlack text-neutral-700">{actor.character}</span></li>
                            ))) : (<p className="font-bold dark:text-tertiaryBlack text-secundaryBlack">Não informado</p>)}
                        </ul>
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