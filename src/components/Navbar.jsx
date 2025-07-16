import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiSearchAlt2, BiCameraMovie, IoMenu, IoClose, IoTv, MdMovie, IoInfiniteSharp, IoHomeSharp } from '../utils/icones'
import ToggleTheme from "./ToggleTheme"

export default function Navbar() {
  const [search, setSearch] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleCloseMenu = () => setIsMenuOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    navigate(`/search?q=${search}`)
    setSearch("")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <nav className="navbar fixed w-100 z-30 flex justify-around items-center p-8 font-bold dark:bg-primaryBlack bg-darkBack border-b dark:border-primaryYellow border-primaryRed drop-shadow-sm backdrop-blur-sm shadow-2xl">

      {/* Logo */}
      <h2 className="text-primaryRed text-3xl hover:scale-110 hover:transition ease-in-out mb-2">
        <Link to='/'>
          <BiCameraMovie className="inline mb-2 text-primaryYellow" />
          <span className="ml-4">What To Watch</span>
        </Link>
      </h2>

      {/* Formulário + Menu Dropdown */}
      <div className="flex items-center gap-5 text-primaryYellow relative">

        {/* Formulário de Pesquisa */}
        <form className="flex gap-2 *:rounded" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="O que você está buscando?"
            className="py-2 pr-20 pl-4 border border-primaryYellow bg-primaryWhite dark:bg-darkBack dark:text-primaryYellow text-primaryRed"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit" className="card px-3 pt-2 text-lg pointer bg-primaryRed text-white hover:bg-secondaryRed">
            <BiSearchAlt2 size={24} />
          </button>
        </form>


        {/* Botão de Menu */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="dark:bg-darkBack bg-primaryWhite border-primaryRed hover:bg-primaryYellow.k px-2 py-2 border rounded flex items-center hover:text-secondaryRed text-primaryRed"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <ul className="absolute left-0 top-full mt-2 dark:bg-primaryBlack bg-darkBack border border-primaryRed rounded shadow-lg flex flex-col min-w-[150px] animate-fade-in z-[99]">
              <li>
                <Link to="/action" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={handleCloseMenu}>
                  <MdMovie className="inline mb-1" /> Filmes
                </Link>
              </li>
              <li>
                <Link to="/another" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={handleCloseMenu}>
                  <IoTv className="inline mb-1" /> Séries
                </Link>
              </li>
              <li>
                <Link to="/something-else" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={handleCloseMenu}>
                  <IoInfiniteSharp className="inline mb-1" /> Todos
                </Link>
              </li>
              <li>
                <Link to="/something-else" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={handleCloseMenu}>
                  <IoHomeSharp className="inline mb-1" /> Início
                </Link>
              </li>
              <li><hr className="border-primaryYellow" /></li>
              <li className="block px-4 py-2 hover:bg-primaryRed hover:text-primaryBlack">
                  <ToggleTheme  />
              </li>
              
              
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
