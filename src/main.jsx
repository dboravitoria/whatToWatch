import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Serie from './pages/Serie.jsx'
import Search from './pages/Search.jsx'
import NotFound from './components/NotFound.jsx'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
            <Route path='/' element={<Home />}/>
            <Route path="*" element={<NotFound />} />
            <Route path='/movie/:id' element={<Movie />}/>
            <Route path='/tv/:id' element={<Serie />}/>
            <Route path='/search' element={<Search />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
