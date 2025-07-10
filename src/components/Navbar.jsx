import { Link } from "react-router-dom"
import { BiSearchAlt2, BiCameraMovie } from "react-icons/bi"


export default function Navbar() {
  return (
        <>
            <nav className="
            navbar flex justify-between items-center p-8 font-bold
            bg-primaryBlack shadow-2xl border-b border-primaryYellow drop-shadow-sm backdrop-blur-sm">
            <h2 className="text-primaryRed text-3xl hover:scale-110 hover:transition ease-in-out">
              <Link to='/'>
                <BiCameraMovie className="inline mb-2 text-primaryYellow"/><span className="ml-4">What To Watch</span>
              </Link>
            </h2>
            <form className="flex text-white gap-2 *:rounded">
                    <input type="text" placeholder="O que você está buscando?" className="py-2 pr-20 pl-4"/>
                    <button type="submit" className="bg-primaryRed p-2 text-lg border-2 border-primaryRed pointer hover:bg-transparent hover:transition-all hover:text-primaryRed"><BiSearchAlt2/></button>
            </form>
          </nav>
        </>
  )
}
