import { Link } from "react-router-dom"
import {FaStar} from 'react-icons/fa'

const urlImg = import.meta.env.VITE_IMG

export default function MovieCard({movie, showLink=true}) {
    

  return (
        <>
           
            <div className="card bg-primaryBlack shadow-sm backdrop-blur-xl drop-shadow-xl" style={{width: "24rem", height:"45rem"}}>
                <img src={urlImg + movie.poster_path} alt={movie.title} className="card-img-top rounded-sm shadow-sm mt-4 px-2"/>
                <div className="card-body">
                    <h2 className="card-title h4">{movie.title}</h2>
                    <p className="card-text flex align-middle items-center mt-2 h5"><FaStar className="inline text-primaryYellow w-10 text-xl"/>{movie.vote_average.toFixed(1)}</p>
                    <p className="btn border-2 p-2 font-bold bg-primaryRed fixed-bottom d-block w-50 mx-auto mb-4 hover:text-primaryRed hover:border-2 hover:border-primaryRed">{showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}</p>
                </div>
            </div>
        </>
  )
}
