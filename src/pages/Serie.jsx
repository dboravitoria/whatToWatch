//hooks
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useComeback } from "../hooks/useComeback"

//ícones e imagem
import { BsFillFileEarmarkTextFill, FaStar, FaCalendarAlt, FaUserGroup, MdTimer, IoMdArrowRoundBack, PiPopcornFill, IoStar,IoLayers, FaEarthAmericas, FaCirclePlay } from '../utils/icones'
import notFound from '../assets/notFound.webp' 
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

//funções 
import { formatDate, formatHour, getYear, getCountryInfo } from "../utils/format"
import { fetchDetails, fetchCredits, fetchTrailer } from "../services/mediaService"

//variáveis de ambiente
const searchUrl = "https://api.themoviedb.org/3/tv/"
const apiKey = "api_key=24eb66121fdd14b703bdc7732d396c83"
const imgSearch = "https://image.tmdb.org/t/p/w500"

export default function Serie() {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [cast, setCast] = useState([])
  const [watchProviders, setWatchProviders] = useState([])
  const handleComeback = useComeback()

  // Efeito para buscar os dados da série quando o componente é montado
  useEffect(() => {
      const urlBase = `${searchUrl}${id}`

      const fetchSerieData = async () => {
        try {
          // Busca os detalhes da série, créditos e trailer
          const data = await fetchDetails(`${urlBase}?${apiKey}&language=pt-BR`)
          setSerie(data)
          const credits = await fetchCredits(`${urlBase}`, 10) 
          setCast(credits.cast)
          const trailer = await fetchTrailer(`${urlBase}`)
          setTrailerUrl(trailer)
          // Busca onde assistir
          const providerUrl = `https://api.themoviedb.org/3/tv/${id}/watch/providers?${apiKey}`
          const response = await fetch(providerUrl)
          const providerData = await response.json()
          const providersInBR = providerData.results?.BR?.flatrate || []
          setWatchProviders(providersInBR)
        } catch (error) {
          console.error("Erro ao buscar dados da série:", error)
        }
      }
      fetchSerieData()
    }, [id])


  return (
    <>
    {/* Esse console é só para ambiente de desenvolvimento, pra eu ver oq a série me retorna */}
    {console.log(serie)}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        {/* Grid de detalhes da série */}
        <div className="row justify-center gap-4 mb-10 mt-24">
          {serie && (
            <>
            {/* Lado esquerdo do grid */}
              <motion.div className="col-9 col-md-4 mt-5 mt-md-0" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                {/* Transição que faz aumentar o botão no hover */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <button className="card px-4 py-2 mt-5 dark:bg-primaryBlack bg-tertiaryBlack hover:bg-primaryRed dark:hover:bg-primaryRed" onClick={handleComeback}>
                    <IoMdArrowRoundBack />
                  </button>
                </motion.div>

                {/* Card com a imagem da série */}
                <motion.div className="card mt-5 p-2 rounded-md dark:bg-primaryBlack bg-tertiaryBlack shadow-md" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 200 }}>
                  {serie.poster_path ? (
                    <motion.img src={imgSearch + serie.poster_path} className="card-img-top rounded-md mt-2" alt={serie.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />):(
                    <img src={notFound} alt="Imagem não encontrada..." className="card-img-top rounded-md mt-4" />
                  )}
                  
                  {/* Lista de detalhes da serie */}
                  <ul className="list-group list-group-flush *:dark:bg-primaryBlack *:bg-tertiaryBlack">

                    {/* Lista de gêneros da serie  */}
                    <li className="list-group-item *:inline">
                      <h3 className="font-bold inline"><PiPopcornFill className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2"/> Gênero: </h3>
                      <p className="dark:text-tertiaryBlack text-secundaryBlack">
                        {serie.release_date !== 0 ? ( serie.genres.map((genre, index) => ( index === serie.genres.length - 1 ? genre.name : `${genre.name}/`))) : ("Não informado")}
                      </p>
                    </li>

                    {/* Data de lançamento */}
                    <li className="list-group-item *:inline">
                      <h3 className="font-bold inline">
                        <FaCalendarAlt className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Estreia: </h3>
                      <p className="dark:text-tertiaryBlack text-secundaryBlack">{formatDate(serie.first_air_date)}</p>
                    </li>

                    {/* Número de temporadas */}
                    <li className="list-group-item *:inline">
                    <h3 className="font-bold inline">
                      <IoLayers className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Temporadas: </h3>
                    <p className="dark:text-tertiaryBlack text-secundaryBlack">
                      {serie.number_of_seasons > 0 ? serie.number_of_seasons : "Não informado"}</p>
                  </li>

                  {/* Média de duração por epsódio*/}                   
                  <li className="list-group-item *:inline">
                      <h3 className="font-bold inline">
                        <MdTimer className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Duração média por Epsódio: </h3>
                      <p className="dark:text-tertiaryBlack text-secundaryBlack">
                        {serie.episode_run_time.length > 0 ? formatHour( Math.floor( serie.episode_run_time.reduce((acc, dur) => acc + dur, 0) / serie.episode_run_time.length)): 'Não disponível'}</p>
                    </li>

                    {/* Inserir um item que pega a quantidade de epsódios */}


                    {/* País de origem com bandeirinha */}
                    <li className="list-group-item *:inline">
                      <h3 className="font-bold inline">
                        <FaEarthAmericas className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> País de Origem: </h3>
                      <p className="dark:text-tertiaryBlack text-secundaryBlack">
                        {serie.origin_country.length > 0 ? serie.origin_country.map(getCountryInfo).join(", ") : "Não disponível"}
                      </p>
                    </li>


                    {/* Diretor da série, caso não tenha, traz "Não informado" */}
                    <li className="list-group-item *:inline">
                      <p className="font-bold mt-3">
                        <IoStar className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" />
                        Diretor: {" "}
                        <span className="dark:text-tertiaryBlack text-neutral-700 ">
                          {serie.created_by.length > 0 ? serie.created_by.map((diretor, index) => index === serie.created_by.length - 1 ? diretor.name: `${diretor.name}, `): "Não informado"}
                        </span>
                      </p>
                    </li>
                    <li className="list-group-item *:inline mt-2">
                    <h3 className="font-bold inline"><FaCirclePlay className="inline mb-1 dark:text-primaryYellow text-primaryRed mr-2" /> Onde assistir: </h3>
                    {watchProviders.length > 0 ? (
                      watchProviders.map((provider) => (
                        <img key={provider.provider_id} src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} title={provider.provider_name} className="inline w-10 h-10 mx-1"/>
                      ))
                    ) : (<p className="dark:text-tertiaryBlack text-secundaryBlack ml-1 inline">Não disponível</p>)}
                    </li>

                  </ul>
                </motion.div>
              </motion.div>


              {/* Lado direito do grid */}
              <motion.div className="col-md-5 col-9 md:mt-32 mt-10" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>

                {/* Card com nome, ano, nota e slogam da série */}
                <motion.div className="card p-3 dark:bg-primaryBlack bg-tertiaryBlack" whileHover={{ scale: 1.01 }}>
                  <h2 className="card-title h4 inline">{serie.name} {getYear(serie.first_air_date)}</h2>
                  <p className="card-text flex align-middle items-center mt-3 h5">
                    <FaStar className="inline text-primaryYellow w-10 text-xl" />
                    {serie.vote_average === 0 ? "Não existe avaliação" : serie.vote_average.toFixed(1)}
                  </p>
                  <p className="tagline italic dark:text-tertiaryBlack text-secundaryBlack">{serie.tagline ? `"${serie.tagline}"` : ""}</p>
                </motion.div>

                {/* Trailer da série */}
                {trailerUrl && (

                  <motion.div className="trailer mt-10" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    {/* Animação de entrada do trailer */}
                    <div className="aspect-w-16 aspect-h-9">

                      {/* Iframe do trailer da série do Youtube */}
                      <iframe className="card w-full h-72 md:h-96 rounded shadow" src={trailerUrl} title="Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>

                    {/* Card com a sinopse e elenco da série */}
                    <motion.div className="card mt-5  dark:bg-primaryBlack bg-tertiaryBlack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                      <div className="card-body">

                        {/* Sinopse da serie */}
                        <h2 className="font-bold mb-4"> <BsFillFileEarmarkTextFill className="inline dark:text-primaryYellow text-primaryRed mb-1 mr-2" /> Sinopse: </h2>
                        <p>{serie.overview}</p>

                        {/* Lista de atores da série, caso não tenha, traz "Não informado" */}
                        <li className="list-group-item mt-3">
                          <h3 className="font-bold mt-3"> <FaUserGroup className="inline mb-1 mr-2 dark:text-primaryYellow text-primaryRed" /> Elenco principal: </h3>
                          {/* Lista de atores do elenco */}
                          <ul className="dark:text-white text-secundaryBlack text-sm list-disc pl-5 mt-2">
                            {cast.length > 0 ? (cast.map(actor => (<li key={actor.id}>{actor.name} / <span className="italic dark:text-tertiaryBlack text-neutral-700">{actor.character}</span></li>))) : (<li>Elenco não disponível</li>)}</ul>
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
