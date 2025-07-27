import './App.css'
import Navbar from './components/navbar.tsx'
import Footer from './components/footer.tsx'
import { Routes, Route } from "react-router-dom"
import Landing from './pages/landing.tsx'
import Home from './pages/home.tsx'
import Movie from './pages/movie.tsx'
import Series from './pages/series.tsx'

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main className='mt-18'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Movie' element={<Movie />} />
          <Route path='/Series' element={<Series />} />
        </Routes>
      </main>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
