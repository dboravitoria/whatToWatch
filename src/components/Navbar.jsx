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
    <nav className="navbar fixed w-100 z-30 p-3 px-4 bg-darkBack dark:bg-primaryBlack border-b border-primaryRed dark:border-primaryYellow shadow-lg">
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
    
          {/* Logo */}
          <Link to='/' className="navbar-brand text-primaryRed d-flex align-items-center font-bold text-2xl hover:text-secondaryRed hover:scale-110 hover:transition ease-in-out">
            <BiCameraMovie className="text-primaryYellow me-2" />
            <span>What To Watch</span>
          </Link>

          {/* FORMULÁRIO DE BUSCA */}
          <form className="d-flex align-items-center my-2 my-sm-0 flex-grow-1 mx-3" onSubmit={handleSubmit}>
            <input type="text" placeholder="O que você está buscando?" className="form-control me-2 dark:bg-darkBack bg-primaryWhite text-primaryRed dark:text-primaryYellow dark:border-primaryYellow border-primaryRed" onChange={(e) => setSearch(e.target.value)} value={search}/>
              <button type="submit" className="btn py-2 bg-primaryRed text-white hover:bg-secondaryRed">
                <BiSearchAlt2 size={20} />
              </button>
          </form>

          {/* BOTÃO DE MENU */}
          <div className="position-relative d-flex ms-auto mr-4 ">
            <button onClick={toggleMenu} className="btn dark:bg-darkBack bg-primaryWhite hover:bg-primaryWhite text-primaryRed dark:text-primaryYellow  d-flex align-items-center justify-content-center hover:text-primaryRed" aria-label="Abrir menu">
              {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>

            {/* DROPDOWN */}
            {isMenuOpen && (
              <ul className="position-absolute p-4 mt-10 border end-0 border-primaryRed rounded bg-darkBack dark:bg-primaryBlack shadow z-10">
                <li>
                  <Link to="/pageindevelopment" className="dropdown-item text-primaryRed dark:text-primaryYellow hover:bg-tertiaryBlack dark:hover:bg-darkBack rounded-md p-2" onClick={handleCloseMenu}>
                    <MdMovie className="me-1 inline mb-1" /> Filmes
                  </Link>
                </li>
                <li>
                  <Link to="/pageindevelopment" className="dropdown-item text-primaryRed dark:text-primaryYellow hover:bg-tertiaryBlack dark:hover:bg-darkBack rounded-md p-2" onClick={handleCloseMenu}>
                    <IoTv className="me-1 inline mb-1 " /> Séries
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-item text-primaryRed dark:text-primaryYellow hover:bg-tertiaryBlack dark:hover:bg-darkBack rounded-md p-2" onClick={handleCloseMenu}>
                    <IoInfiniteSharp className="me-1 inline mb-1" /> Todos
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-item text-primaryRed dark:text-primaryYellow hover:bg-tertiaryBlack dark:hover:bg-darkBack rounded-md p-2" onClick={handleCloseMenu}>
                    <IoHomeSharp className="me-1 inline mb-1" /> Início
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li className="dropdown-item text-primaryRed dark:text-primaryYellow hover:bg-tertiaryBlack dark:hover:bg-darkBack rounded-md p-2">
                  <ToggleTheme />
                </li>
              </ul>
            )}
          </div>
        </div>
    </nav>

  )
}
