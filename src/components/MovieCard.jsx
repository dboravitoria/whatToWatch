import { Link } from "react-router-dom"
import {FaStar} from '../utils/icones.js'
import notFound from '../../public/notFound.webp'
// eslint-disable-next-line no-unused-vars
import { motion  } from "framer-motion";

import { getYear } from "../utils/format";



export default function MovieCard({movie, showLink=true}) {

    const urlImg = import.meta.env.VITE_IMG

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

                    {showLink && (
                        <Link to={`/movie/${movie.id}`}>
                            <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="btn border-2 p-2 font-bold bg-primaryRed fixed-bottom d-block w-50 mx-auto mb-4 hover:text-primaryRed hover:border-primaryRed"
                            >Detalhes</motion.button>
                        </Link>)}

                </div>
            </div>
        </>
  )
}
