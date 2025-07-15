import { Link } from "react-router-dom"
export default function Footer() {
    //link para o site do TMDB 
    const siteTMDB = import.meta.env.VITE_TMDB_SITE

  return (
        <>
            <nav className="dark:bg-primaryBlack bg-darkBack fixed-bottom  p-4 block mx-auto text-center font-bold shadow-2xl border-t dark:border-primaryYellow border-primaryRed drop-shadow-sm backdrop-blur-sm">
            <div className="container-fluid">
              <Link target="_blank" className="navbar-brand text-primaryRed font-bold" to={siteTMDB}><span className="text-primaryYellow">&copy;</span> TMDB && What To Watch - 2025</Link>
            </div>
            </nav>
        </>
  )
}
