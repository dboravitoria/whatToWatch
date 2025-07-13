import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {BiSearchAlt2, BiCameraMovie} from '../utils/icones'


export default function Navbar() {

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!search)return
    navigate(`/search?q=${search}`)
    setSearch("")
  }

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
            <form className="flex text-primaryYellow gap-2 *:rounded" onSubmit={handleSubmit}>
                    <input type="text" placeholder="O que você está buscando?" className="py-2 pr-20 pl-4" onChange={(e)=> setSearch(e.target.value)} value={search}/>
                    
                    <button type="submit" className="card bg-primaryRed p-2 text-lg border-2 border-primaryRed pointer hover:bg-transparent hover:transition-all hover:text-primaryRed"><BiSearchAlt2/></button>
            </form>
          </nav>
        </>
  )
}
