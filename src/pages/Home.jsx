//importação dos hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading" 
//importação dos componentes
import Card from "../components/Card"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"

//variáveis de ambiente
const moviesURL = "https://api.themoviedb.org/3/movie/"
const seriesURL = "https://api.themoviedb.org/3/tv/"
const apiKey = "api_key=24eb66121fdd14b703bdc7732d396c83"

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [topSeries, setTopSeries] = useState([])
  const [combinedResults, setCombinedResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  const { isLoading, withLoading } = useLoading() 

  //função para buscar os filmes e séries mais bem avaliados
  const getTopRated = async (pageNumber) => {
      try {
        const moviesRes = await fetch(`${moviesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`)
        const seriesRes = await fetch(`${seriesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`)

        if (!moviesRes.ok) {
          if (moviesRes.status === 500) {
            navigate('/500')
            return
          }
          throw new Error("Erro ao buscar filmes")
        }

        if (!seriesRes.ok) {
          if (seriesRes.status === 500) {
            navigate('/500')
            return
          }
          throw new Error("Erro ao buscar séries")
        }

        const moviesData = await moviesRes.json()
        const seriesData = await seriesRes.json()

        setTopMovies(Array.isArray(moviesData.results) ? moviesData.results.slice(0, 11) : [])
        setTopSeries(Array.isArray(seriesData.results) ? seriesData.results.slice(0, 10) : [])
        setTotalPages(Math.min(moviesData.total_pages, 500))

      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }


  //efeito colateral que traz os filmes e séries mais bem avaliados
  useEffect(() => {
      withLoading(async () => {
        await getTopRated(page)
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, navigate])


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
    <div className="bg-primaryWhite dark:bg-darkBack mt-48 md:mt-40">
      
        {/* Título que varia se for a primeira página */}
        <h1 className="font-bold text-4xl p-4 dark:text-primaryYellow text-primaryRed text-center m-5">
          {page === 1 ? "Filmes e Séries mais bem avaliados:" : "Ordem decrescente de avaliação."}
        </h1>
        {/* Exibe os filmes e séries mais bem avaliados */}
        <div className="row justify-content-center g-4 gap-4">
          {/* Se ainda estiver carregando, mostra a aniamação de loading */}
          {isLoading ? (<Loading />) :
          (!combinedResults || combinedResults.length === 0 ? (
            <p className="text-primaryRed text-center font-bold">Nenhum resultado encontrado</p>
          ) : (combinedResults.map(item => (<Card item={item} key={item.id} />)))
        )}
        </div>
        {/* Exibe a paginação */}
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} page={page} />
        
    </div>
    </>
  )
}