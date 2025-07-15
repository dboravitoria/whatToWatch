//hooks
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useLoading } from "../hooks/useLoading"
//importação dos componentes
import Card from "../components/Card";
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"


//variáveis de ambiente
const moviesSearchUrl = import.meta.env.VITE_SEARCH_MOVIE
const seriesSearchUrl = import.meta.env.VITE_SEARCH_SERIES
const apiKey = import.meta.env.VITE_KEY_API

export default function Search() {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [combinedResults, setCombinedResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const query = searchParams.get("q")
  const { isLoading, withLoading } = useLoading()

  // Função para buscar resultados de filmes e séries
  const getSearchResults = async () => {
      const moviesRes = await fetch(`${moviesSearchUrl}?${apiKey}&query=${query}&page=${page}&language=pt-BR`)
      const moviesData = await moviesRes.json()

      const seriesRes = await fetch(`${seriesSearchUrl}?${apiKey}&query=${query}&page=${page}&language=pt-BR`)
      const seriesData = await seriesRes.json()

      setMovies(moviesData.results.slice(0, 9))
      setSeries(seriesData.results.slice(0, 9))
      setTotalPages(Math.min(moviesData.total_pages, 500))
    }

      // Efeito colateral que combina os resultados de filmes e séries
      useEffect(() => {
        const combined = [...movies, ...series]
        combined.sort((a, b) => b.vote_average - a.vote_average)
        setCombinedResults(combined)
      }, [movies, series])

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
       <div className="mt-40">
      
        {/* Título que exibe a query de busca */}
        <h1 className="font-bold text-4xl p-4 dark:text-primaryYellow text-primaryRed text-center m-5">
          Resultado: <span className="dark:text-white text-secundaryBlack uppercase">{query}</span>
        </h1>
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