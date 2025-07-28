import './App.css'
import Navbar from './components/navbar.tsx'
import Footer from './components/footer.tsx'
import { Routes, Route } from "react-router-dom"
import Landing from './pages/landing.tsx'
import Home from './pages/home.tsx'
import Movie from './pages/movie.tsx'
import Series from './pages/series.tsx'
import SearchMovie from './pages/search.tsx'

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className='mt-18'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/series' element={<Series />} />
          <Route path='/search/:query' element={<SearchMovie />} /> {/* ✅ new route */}
        </Routes>
      </main>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
