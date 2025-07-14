import { useEffect, useState } from "react"
import Card from "../components/Card"
import { FaFastBackward, FaStepBackward, FaFastForward, FaStepForward } from '../utils/icones'
import { ClipLoader } from "react-spinners"

const moviesURL = import.meta.env.VITE_URL_API_MOVIE
const seriesURL = import.meta.env.VITE_URL_API_SERIES
const apiKey = import.meta.env.VITE_KEY_API

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [topSeries, setTopSeries] = useState([])
  const [combinedResults, setCombinedResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getTopRated = async (pageNumber) => {
    try {
      setIsLoading(true)

      
      const moviesRes = await fetch(`${moviesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`)
      const moviesData = await moviesRes.json()

      
      const seriesRes = await fetch(`${seriesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`)
      const seriesData = await seriesRes.json()

      setTopMovies(moviesData.results.slice(0, 9)) 
      setTopSeries(seriesData.results.slice(0, 9))  

      setTotalPages(Math.min(moviesData.total_pages, 500)) 

    } catch (error) {
      console.error("Erro ao buscar filmes e séries:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const combined = [...topMovies, ...topSeries]
    combined.sort((a, b) => b.vote_average - a.vote_average)
    setCombinedResults(combined)
  }, [topMovies, topSeries])

  useEffect(() => {
    getTopRated(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && totalPages > 0 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <>
      <h1 className="font-bold text-4xl p-4 text-primaryYellow text-center m-5">
        {page === 1 ? "Filmes e Séries mais bem avaliados:" : "Ordem decrescente de avaliação."}
      </h1>

      <div className="row justify-content-center g-4 gap-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center my-20">
            <ClipLoader color="#facc15" size={50} />
            <p className="text-primaryYellow mt-4">Carregando...</p>
          </div>
        ) : (
          combinedResults.length > 0 ? (
            combinedResults.map(item => (
              <Card item={item} key={item.id} />
            ))
          ) : (
            <p className="text-primaryRed text-center font-bold">Nenhum resultado encontrado</p>
          )
        )}
      </div>

      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 rounded flex justify-center items-center text-white card bg-primaryBlack hover:bg-secondaryRed"
          >
            <FaFastBackward />
          </button>
        )}
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 rounded flex justify-center items-center text-white card bg-primaryBlack hover:bg-secondaryRed"
          >
            <FaStepBackward />
          </button>
        )}
        {(() => {
          const paginationRange = 2
          const startPage = Math.max(1, page - paginationRange)
          const endPage = Math.min(totalPages, page + paginationRange)

          return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded card ${
                  pageNumber === page
                    ? "bg-primaryYellow text-black font-bold"
                    : "bg-secundaryBlack text-white hover:bg-secondaryYellow"
                }`}
              >
                {pageNumber}
              </button>
            )
          })
        })()}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 rounded flex justify-center items-center text-white card bg-primaryBlack hover:bg-secondaryRed"
          >
            <FaStepForward />
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 rounded flex justify-center items-center text-white card bg-primaryBlack hover:bg-secondaryRed"
          >
            <FaFastForward />
          </button>
        )}
      </div>
    </>
  )
}
