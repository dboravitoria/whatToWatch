//importação dos hooks
import { useEffect, useState } from "react"
import { useLoading } from "../hooks/useLoading" 
//importação dos componentes
import Card from "../components/Card"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"
//variáveis de ambiente
const moviesURL = import.meta.env.VITE_URL_API_MOVIE
const seriesURL = import.meta.env.VITE_URL_API_SERIES
const apiKey = import.meta.env.VITE_KEY_API

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [topSeries, setTopSeries] = useState([])
  const [combinedResults, setCombinedResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { isLoading, withLoading } = useLoading() 

  //função para buscar os filmes e séries mais bem avaliados
  const getTopRated = async (pageNumber) => {
    const moviesRes = await fetch(`${moviesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`)
    const moviesData = await moviesRes.json()
    const seriesRes = await fetch(`${seriesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`)
    const seriesData = await seriesRes.json()
    //retorna os 9 primeiros filmes e séries
    setTopMovies(moviesData.results.slice(0, 9))
    setTopSeries(seriesData.results.slice(0, 9))
    setTotalPages(Math.min(moviesData.total_pages, 500))
  }

  //efeito colateral que traz os filmes e séries mais bem avaliados
  useEffect(() => {
    withLoading(() => getTopRated(page)) 
    //scroll suave
    window.scrollTo({ top: 0, behavior: "smooth" })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  //efeito colateral que combina os filmes e séries mais bem avaliados
  useEffect(() => {
    const combined = [...topMovies, ...topSeries]
    combined.sort((a, b) => b.vote_average - a.vote_average)
    setCombinedResults(combined)
  }, [topMovies, topSeries])

  //função que lida a mudança de página
  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && totalPages > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <>
    <div className="bg-primaryWhite dark:bg-darkBack mt-40">
      
        {/* Título que varia se for a primeira página */}
        <h1 className="font-bold text-4xl p-4 dark:text-primaryYellow text-primaryRed text-center m-5">
          {page === 1 ? "Filmes e Séries mais bem avaliados:" : "Ordem decrescente de avaliação."}
        </h1>
        {/* Exibe os filmes e séries mais bem avaliados */}
        <div className="row justify-content-center g-4 gap-4">
          {/* Se ainda estiver carregando, mostra a aniamação de loading */}
          {isLoading ? (<Loading />) :
          (combinedResults.length > 0 ? ( combinedResults.map(item => (<Card item={item} key={item.id} />))) : (<p className="text-primaryRed text-center font-bold">Nenhum resultado encontrado</p>))}
        </div>
        {/* Exibe a paginação */}
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} page={page} />
    </div>
    </>
  )
}
