import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { FaFastBackward, FaStepBackward, FaFastForward, FaStepForward } from "react-icons/fa";
import { ClipLoader } from "react-spinners"


const moviesURL = import.meta.env.VITE_URL_API
const apiKey = import.meta.env.VITE_KEY_API

export default function Home() {
  const [topMovies, setTopMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const getTopRatedMovies = async (pageNumber) => {
    try {
      setIsLoading(true);
      const url = `${moviesURL}top_rated?${apiKey}&language=pt-BR&page=${pageNumber}`
      const res = await fetch(url)
      const data = await res.json()

      setTopMovies(data.results.slice(0,18))
      setTotalPages(Math.min(data.total_pages, 500))
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }finally{
        setIsLoading(false);
      }
  }

  useEffect(() => {
    getTopRatedMovies(page)
    window.scrollTo({
    top: 0,
    behavior: "smooth",
    
  })
  }, [page])

  const handlePageChange = (newPage) => {
  console.log("Tentando ir para a página:", newPage)
  if (
    newPage !== page &&
    newPage >= 1 &&
    totalPages > 0 &&
    newPage <= totalPages
  ) {
    setPage(newPage)
  }
}

  return (
    <>
      <h1 className="font-bold text-4xl p-4 text-primaryYellow text-center m-5">
        {page == 1 ? "Filmes mais bem avaliados:" : "Os filmes seguem em ordem decrescente de avaliação."}
      </h1>

      <div className="row justify-content-center g-4 gap-4">
        {isLoading ? (
              <div className="flex flex-col items-center justify-center my-20">
                <ClipLoader color="#facc15" size={50} />
                <p className="text-primaryYellow mt-4">Carregando...</p>
              </div>
            ) : (
              <div className="row justify-content-center g-4 gap-4">
                {topMovies.length > 0 ? (
                  topMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))
                ) : (
                  <p className="text-primaryRed text-center font-bold">Nenhum filme encontrado</p>
                )}
              </div>
            )}


        
      </div>

      
      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        {/* Botão Primeira Página */}
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
  )
}
