import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar.tsx'
import Footer from './components/footer.tsx'
import Landing from './pages/landing.tsx'
import Home from './pages/home.tsx'
import Movie from './pages/movie.tsx'
import Series from './pages/series.tsx'

function App() {
  return (
    <Router>
        <div>
          <Navbar />
        </div>
        <main className='mt-18'>
          <Routes>
            <Route path='/' element={<Landing/>}></Route>
            <Route path='/Home' element={<Home/>}></Route>
            <Route path='/Movie' element={<Movie/>}></Route>
            <Route path='/Series' element={<Series/>}></Route>
          </Routes>
        </main>
         <div>
          <Footer />
        </div>
    </Router>
  )
}

export default App
