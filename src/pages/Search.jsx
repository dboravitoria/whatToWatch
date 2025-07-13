import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { ClipLoader } from "react-spinners"
import { FaFastBackward, FaStepBackward, FaFastForward, FaStepForward } from "react-icons/fa";

const searchUrl = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_KEY_API

export default function Search() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const query = searchParams.get("q")

  const getSearchResults = async () => {
    try {
      setIsLoading(true)
      const url = `${searchUrl}?${apiKey}&query=${query}&page=${page}&language=pt-BR`
      const res = await fetch(url)
      const data = await res.json()
      setMovies(data.results.slice(0, 18))
      setTotalPages(data.total_pages)
    } catch (error) {
      console.error("Erro ao buscar filmes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    getSearchResults()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page])

  return (
    <>
      <h1 className="font-bold text-4xl p-4 text-primaryYellow text-center m-5">
        Resultado: <span className="text-white uppercase">{query}</span>
      </h1>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center my-20">
          <ClipLoader color="#facc15" size={50} />
          <p className="text-primaryYellow mt-4">Carregando...</p>
        </div>
      ) : (
        <>
          <div className="row justify-content-center g-4 gap-4">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))
            ) : (
              <p className="text-primaryRed uppercase text-center font-bold">
                Nenhum filme encontrado ❌
              </p>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {/* Primeira */}
            

            {page > 1 && (
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-4 py-2 rounded items-center flex justify-center
                        text-white card
                        bg-primaryBlack hover:bg-secondaryRed"
                      >
                        <FaFastBackward/>
                      </button>
                    )}

            {/* Anterior */}
            {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 rounded items-center flex justify-center
            text-white card
            bg-primaryBlack hover:bg-secondaryRed"
          >
            <FaStepBackward/>
          </button>
        )}

            {/* Páginas numeradas */}
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

            {/* Próxima */}
            {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 rounded items-center flex justify-center
            text-white card
            bg-primaryBlack hover:bg-secondaryRed"
          >
            <FaStepForward/>
          </button>
        )}
        {page < totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 rounded items-center flex justify-center
            text-white card
            bg-primaryBlack hover:bg-secondaryRed"
        >
          <FaFastForward/>
        </button>
      )}
          </div>
        </>
      )}
    </>
  )
}
