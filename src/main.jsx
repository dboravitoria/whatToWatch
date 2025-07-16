import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//importando as páginas
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Serie from './pages/Serie.jsx'
import Search from './pages/Search.jsx'
import Error500 from './pages/Error500.jsx';
import NotFound from './components/NotFound.jsx'


//importando os estilos
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Definindo as rotas do aplicativo */}
      <Routes>
        <Route element={<App/>}>
            <Route path='/' element={<Home />}/>
            {/* Rota para página não encontrada */}
            <Route path="*" element={<NotFound />} />
            <Route path="/500" element={<Error500 />} />
            <Route path='/movie/:id' element={<Movie />}/>
            <Route path='/tv/:id' element={<Serie />}/>
            <Route path='/search' element={<Search />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
