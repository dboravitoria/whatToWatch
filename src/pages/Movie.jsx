import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BsFillFileEarmarkTextFill } from "react-icons/bs"
import { FaStar, FaCalendarAlt,FaWallet } from 'react-icons/fa'
import { MdTimer } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { IoMdArrowRoundBack } from "react-icons/io";
import notFound from '../../public/notFound.webp'


const searchUrl = import.meta.env.VITE_URL_API
const apiKey = import.meta.env.VITE_KEY_API
const imgSearch = import.meta.env.VITE_IMG

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState("")
  const navigate = useNavigate()
  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    setMovie(data)
  }

  const getCredits = async () => {
    const res = await fetch(`${searchUrl}${id}/credits?${apiKey}`)
    const data = await res.json()

    const mainCast = data.cast.slice(0, 5) // os 5 primeiros atores
    setCast(mainCast)

    const directorInfo = data.crew.find(person => person.job === "Director")
    if (directorInfo) {
      setDirector(directorInfo.name)
    }
  }


  const getTrailer = async () => {
    const res = await fetch(`${searchUrl}${id}/videos?${apiKey}`)
    const data = await res.json()

    const trailer = data.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    )

    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`)
    }
  }

  const handleComeback = async()=>{
      navigate(-1)
  }

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  const formatDate = (date) => {
    const data = new Date(date)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

  const getYear = (year) =>{
    const data = new Date(year)
    const ano = data.getFullYear()
    return `(${ano})`
  }
  const formatHour = (hour)=>{
      const minutos = hour;
      const horas = Math.floor(minutos / 60); // 1
      const restoMinutos = minutos % 60;      // 30
      return `${horas}h ${restoMinutos}min`
 
  }

  useEffect(() => {
    const movieUrl = `${searchUrl}${id}?${apiKey}&language=pt-BR`
    getMovie(movieUrl)
    getTrailer()
    getCredits() // <<< adiciona essa linha aqui
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div className="row justify-center gap-4 mb-10">
        
        <p>{console.log(movie)}</p>
          {movie && (
            <>

            <div className="col-6">
              <button className="
              card px-4 py-2 bg-primaryBlack hover:bg-primaryRed
              "
              onClick={handleComeback}
              >
                <IoMdArrowRoundBack />
              </button>
              <div className="card mt-5 rounded-sm bg-primaryBlack">
                {movie.poster_path ?
                 (<img src={imgSearch + movie.poster_path} className="card-img-top rounded-md mt-4" alt={movie.title}/>)
                 : 
                 (<img src={notFound} alt="Imagem não encontrada..." className="card-img-top rounded-md mt-4"/>)
                 }
                
                <div className="card-body">
                  <h2 className="card-title h4 inline">{movie.title} {getYear(movie.release_date)}</h2>
                  <p className="card-text flex align-middle items-center mt-2 h5">
                    <FaStar className="inline text-primaryYellow w-10 text-xl" />{movie.vote_average.toFixed(2)}
                  </p>
                  <p className="tagline font-bold">{movie.tagline}</p>
                </div>
                <ul className="list-group list-group-flush *:bg-primaryBlack">
                  <li className="list-group-item">
                    <h3 className="font-bold inline"><FaCalendarAlt className="inline mb-1 text-primaryYellow mr-2"/> Lançamento:</h3>
                    <p>{formatDate(movie.release_date)}</p>
                  </li>
                  <li className="list-group-item">
                    <h3 className="font-bold inline"><FaWallet className="inline mb-1 text-primaryYellow mr-2" /> Orçamento:</h3>
                    <p>{formatCurrency(movie.budget)}</p>
                  </li>
                  <li className="list-group-item">
                    <h3 className="font-bold inline"><SlGraph className="inline mb-1 text-primaryYellow mr-2"/> Receita:</h3>
                    <p>{formatCurrency(movie.revenue)}</p>
                  </li>
                  <li className="list-group-item">
                    <h3 className="font-bold inline"><MdTimer className="inline mb-1 text-primaryYellow mr-2" /> Duração:</h3>
                    <p>{formatHour(movie.runtime)}</p>
                  </li>
                  <li className="list-group-item">
                    <p className="font-bold mt-3">Diretor: <span className="text-white">{director || "Não disponível"}</span></p>
                  </li>

                  <li className="list-group-item">
                    <h3 className="font-bold mt-3">Elenco principal:</h3>
                    <ul className="text-white text-sm list-disc pl-5">
                      {cast.length > 0 ? (
                        cast.map(actor => (
                          <li key={actor.id}>
                            {actor.name} como <span className="italic">{actor.character}</span>
                          </li>
                        ))
                      ) : (
                        <li>Elenco não disponível</li>
                      )}
                    </ul>
                  </li>
                </ul>
                

              </div>
            </div>
              <div className="col-5">
                {trailerUrl && (
                  <div className="trailer mt-20">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="card w-full h-64 md:h-96 rounded shadow"
                        src={trailerUrl}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="card mt-5 bg-primaryBlack">
                      <div className="card-body">
                        <h2 className="font-bold mb-4"><BsFillFileEarmarkTextFill className="inline  text-primaryYellow mb-1 mr-2"/> Sinopse:</h2>
                        <p>{movie.overview}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
      </div>
    </>
  )
}
