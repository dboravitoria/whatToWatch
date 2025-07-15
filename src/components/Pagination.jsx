//ícones 
import { FaFastBackward, FaStepBackward, FaStepForward, FaFastForward } from '../utils/icones'

export default function Pagination({ page, totalPages, onPageChange }) {
  //constantes que organização o início e o fim da paginação
  const paginationRange = 2
  const startPage = Math.max(1, page - paginationRange)
  const endPage = Math.min(totalPages, page + paginationRange)

  return (
    //caixa de botões de paginação
    <div className="flex justify-center  gap-2 mt-8 flex-wrap">
      {page > 1 && (
        <>
          {/* Botão de ir para a primeira página */}
          <button onClick={() => onPageChange(1)} className="px-4 py-2 rounded flex justify-center items-center text-white card dark:bg-primaryBlack dark:hover:bg-secondaryRed bg-secundaryBlack hover:bg-primaryRed">
            <FaFastBackward />
          </button>
          {/* Botão de voltar uma página */}
          <button onClick={() => onPageChange(page - 1)} className="px-4 py-2 rounded flex justify-center items-center text-white card dark:bg-primaryBlack dark:hover:bg-secondaryRed bg-secundaryBlack hover:bg-primaryRed">
            <FaStepBackward />
          </button>
        </>
      )}

      {/* Botões de páginas */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index
        return (
          <button key={pageNumber} onClick={() => onPageChange(pageNumber)} className={`px-4 py-2 rounded card ${pageNumber === page ? "bg-primaryRed dark:bg-primaryYellow text-black font-bold" : "bg-darkBack text-white dark:hover:bg-secondaryYellow hover:bg-secondaryRed"}`}>{pageNumber}</button>)
      })}

      {page < totalPages && (
        <>
          {/* Botão de avançar uma página */}
          <button onClick={() => onPageChange(page + 1)} className="px-4 py-2 rounded flex justify-center items-center text-white card dark:bg-primaryBlack dark:hover:bg-secondaryRed bg-secundaryBlack hover:bg-primaryRed">
            <FaStepForward />
          </button>
          {/* Botão de ir para a última página */}
          <button onClick={() => onPageChange(totalPages)} className="px-4 py-2 rounded flex justify-center items-center text-white card dark:bg-primaryBlack dark:hover:bg-secondaryRed bg-secundaryBlack hover:bg-primaryRed">
            <FaFastForward />
          </button>
        </>
      )}
    </div>
  )
}
