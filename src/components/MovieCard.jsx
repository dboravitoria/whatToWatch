import { Link } from "react-router-dom"
import {FaStar} from 'react-icons/fa'
import notFound from '../../public/notFound.webp'

const urlImg = import.meta.env.VITE_IMG

export default function MovieCard({movie, showLink=true}) {
    const getYear = (year) =>{
    const data = new Date(year)
    const ano = data.getFullYear()
    return `(${ano})`
  }

  return (
        <>
           
            <div className="card bg-primaryBlack shadow-sm backdrop-blur-xl drop-shadow-xl" style={{width: "24rem", height:"50rem"}}>
                {movie.poster_path ?
                (<img src={urlImg + movie.poster_path} className="card-img-top mt-4 rounded-md" alt={movie.title}/>)
                : 
                (<img src={notFound} alt="Imagem não encontrada..." className="card-img-top mt-4 rounded-md"/>)
                }
                
                <div className="card-body">
                    <h2 className="card-title h4 inline">{movie.title} {getYear(movie.release_date)}</h2>
                    <p className="card-text flex align-middle items-center mt-3 h5"><FaStar className="inline text-primaryYellow w-10 text-xl"/>{movie.vote_average == 0 ? "Não existe avaliação" : (movie.vote_average.toFixed(1))}</p>
                    {showLink && <Link to={`/movie/${movie.id}`}><p className="btn border-2 p-2 font-bold bg-primaryRed fixed-bottom d-block w-50 mx-auto mb-4 hover:text-primaryRed hover:border-2 hover:border-primaryRed active:hidden">Detalhes</p></Link>}
                </div>
            </div>
        </>
  )
}
