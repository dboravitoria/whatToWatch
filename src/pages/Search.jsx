//hooks
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useLoading } from "../hooks/useLoading"
import { useComeback } from "../hooks/useComeback"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
//importação dos componentes
import Card from "../components/Card";
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"
import { IoMdArrowRoundBack } from '../utils/icones'

//variáveis de ambiente
const moviesSearchUrl = "https://api.themoviedb.org/3/search/movie"
const seriesSearchUrl = "https://api.themoviedb.org/3/search/tv"
const searchPersonUrl = "https://api.themoviedb.org/3/search/person"
const apiKey = "api_key=24eb66121fdd14b703bdc7732d396c83"

export default function Search() {
  const [searchParams] = useSearchParams()
  const [combinedResults, setCombinedResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const query = searchParams.get("q")
  const handleComeback = useComeback()
  const { isLoading, withLoading } = useLoading()
  const ITEMS_PER_PAGE = 21; 

  const getSearchResults = async () => {
          const ITEMS_PER_API = 5 
          let allMovies = []
          let allSeries = []

          // Busca múltiplas páginas de filmes
          for (let p = 1; p <= ITEMS_PER_API; p++) {
            const res = await fetch(`${moviesSearchUrl}?${apiKey}&query=${query}&page=${p}&language=pt-BR`)
            const data = await res.json()
            if (data?.results) allMovies.push(...data.results)
          }

          // Busca múltiplas páginas de séries
          for (let p = 1; p <= ITEMS_PER_API; p++) {
            const res = await fetch(`${seriesSearchUrl}?${apiKey}&query=${query}&page=${p}&language=pt-BR`)
            const data = await res.json()
            if (data?.results) allSeries.push(...data.results)
          }

          // Busca pessoa (ator/diretor)
          const personRes = await fetch(`${searchPersonUrl}?${apiKey}&query=${query}&language=pt-BR`)
          const personData = await personRes.json()
          let actorCredits = []

          if (personData.results?.length > 0) {
            const actorsAndDirectors = personData.results.filter(
              p => p.known_for_department === "Acting" || p.known_for_department === "Directing"
            )
            if (actorsAndDirectors.length > 0) {
              const person = actorsAndDirectors[0]
              const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${person.id}/combined_credits?${apiKey}&language=pt-BR`)
              const creditsData = await creditsRes.json()
              actorCredits = creditsData.cast?.map(item => ({...item, media_type: item.media_type || (item.first_air_date ? "tv" : "movie") })) || []
            }
          }

          // Junta tudo
          const combined = [ ...allMovies.map(movie => ({ ...movie, media_type: "movie" })), ...allSeries.map(serie => ({ ...serie, media_type: "tv" })), ...actorCredits]

          // Remove duplicatas por id + tipo
          const uniqueMap = new Map()
          combined.forEach(item => {
            const key = `${item.media_type}-${item.id}`
            if (!uniqueMap.has(key)) uniqueMap.set(key, item)
          })
          const uniqueResults = Array.from(uniqueMap.values()).filter(
          item => item.vote_count >= 150 // 👈 só deixa os que têm no mínimo 150 votos
        )

          // Ordena por avaliação
          uniqueResults.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))

          // Paginação manual
          const startIndex = (page - 1) * ITEMS_PER_PAGE
          const paginated = uniqueResults.slice(startIndex, startIndex + ITEMS_PER_PAGE)

          setCombinedResults(paginated)
          setTotalPages(Math.ceil(uniqueResults.length / ITEMS_PER_PAGE))
  }

  //volta sempre pra primeira página quando a query muda
  useEffect(() => {
      setPage(1)
  }, [query])

  // Efeito colateral que busca os resultados quando a query ou a página muda
  useEffect(() => {
      if (query) {
        withLoading(getSearchResults)
      }
      window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, page])

  // Função que lida a mudança de página
  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <>
       <div className="md:mt-40 mt-52 ">
      
          {/* Título que exibe a query de busca */}
            
          {/* Transição que faz aumentar o botão no hover */}
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 100 }}>
            <button className="card md:ml-28 ml-16 px-4 py-2 mt-5 -mb-10 dark:bg-primaryBlack bg-tertiaryBlack hover:bg-primaryRed dark:hover:bg-primaryRed" onClick={handleComeback}>
              <IoMdArrowRoundBack />
            </button>
          </motion.div>

          <h1 className="font-bold text-4xl p-4 dark:text-primaryYellow text-primaryRed text-center m-5"> Resultado: <span className="dark:text-white text-secundaryBlack uppercase">{query}</span></h1>
          {/* Exibe o loading enquanto busca os resultados */}
          {isLoading ? (<Loading message="Buscando resultados..." />) : (
            <>
              <div className="row justify-content-center g-4 gap-4">
                {combinedResults.length > 0 ? (combinedResults.map((item) => (
                    <Card item={item} key={`${item.media_type}-${item.id}`} />))) : (
                  <p className="text-primaryRed uppercase text-center font-bold">
                    Nenhum resultado encontrado ❌
                  </p>
                )}
              </div>
              {/* Componente de paginação */}
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
       </div>
        
    </>
  )
}