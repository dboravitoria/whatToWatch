//importação dos hooks e componentes
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
//importação dos ícones
import { BiSearchAlt2, BiCameraMovie, IoMenu, IoClose } from '../utils/icones'

export default function Navbar() {

  const [search, setSearch] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Função para lidar com o envio do formulário de busca
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    navigate(`/search?q=${search}`)
    setSearch("")
    setIsMenuOpen(false)
  }
  //função que altera o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <nav className="navbar flex justify-around items-center p-8 font-bold bg-primaryBlack border-b border-primaryYellow drop-shadow-sm backdrop-blur-sm shadow-2xl ">
      
      {/* Logo */}
      <h2 className="text-primaryRed text-3xl hover:scale-110 hover:transition ease-in-out">
        <Link to='/'>
          <BiCameraMovie className="inline mb-2 text-primaryYellow" />
          <span className="ml-4">What To Watch</span>
        </Link>
      </h2>

      {/* Formulário + Menu Dropdown */}
      <div className="flex items-center gap-5 text-primaryYellow relative">
        
        {/* Formulário de Pesquisa*/}
        <form className="flex text-primaryYellow gap-2 *:rounded" onSubmit={handleSubmit}>
          <input type="text" placeholder="O que você está buscando?" className="py-2 pr-20 pl-4 bg-darkBack border border-primaryYellow" onChange={(e) => setSearch(e.target.value)} value={search}/>
          <button type="submit" className="card  text-darkBack px-3 pt-2 text-lg pointer  hover:transition-all hover:text-white bg-primaryRed">
            <BiSearchAlt2 size={24}/>
          </button>
        </form>

        {/* Botão de Menu */}
        <div className="relative">
          <button onClick={toggleMenu} className="bg-darkBack px-2 py-2 border border-primaryRed rounded flex items-center gap-1 hover:text-secondaryRed text-primaryRed" aria-label="Abrir menu">
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>

          {/* Dropdown */}
          {isMenuOpen && (
            <ul className="absolute left-0 top-full mt-2 bg-primaryBlack border border-primaryRed rounded shadow-lg flex flex-col z-50 min-w-[150px] animate-fade-in">
              <li>
                <Link to="/action" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={() => setIsMenuOpen(false)}>Filmes</Link>
              </li>
              <li>
                <Link to="/another" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={() => setIsMenuOpen(false)}>Séries</Link>
              </li>
              <li>
                <Link to="/something-else" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={() => setIsMenuOpen(false)}>Todos</Link>
              </li>

              <li><hr className="border-primaryYellow" /></li>
              <li>
                <Link to="/" className="block px-4 py-2 hover:bg-primaryYellow hover:text-primaryBlack" onClick={() => setIsMenuOpen(false)}>Início</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
