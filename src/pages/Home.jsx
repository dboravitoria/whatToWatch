import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

const moviesURL = import.meta.env.VITE_URL_API
const apiKey = import.meta.env.VITE_KEY_API
export default function Home() {
    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url)=>{
        const res = await fetch(url)
        const data = await res.json()
        setTopMovies(data.results)
    }

    useEffect(()=>{
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`
        getTopRatedMovies(topRatedUrl)
    },[])

  return (
        <>
            <h1 className="font-bold text-4xl p-4 text-primaryYellow text-center m-5">Filmes mais bem avaliados:</h1>
            <div className="row justify-content-center g-4 gap-4">
                
                {topMovies.length > 0 ? 
                (topMovies.map((movie)=> <MovieCard movie={movie} key={movie.id}/>))
                : (<p>Carregando...</p>)
                }
            </div>
        </>
  )
}
