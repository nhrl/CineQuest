import MoiveBG from '../assets/movies.jpg'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState, useEffect} from 'react'
import MovieCard from '../components/movieCard';
import type{ Media } from '../types/movie';

const Home: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'movie' | 'tv'>('movie');
    const [movies, setMovies] = useState<Media[]>([]);
    const [tvSeries, setTvSeries] = useState<Media[]>([]);
    const [topRated, setTopRated] = useState<Media[]>([]);

    useEffect(() => {
       fetchMovies();
       fetchTvSeries();
       fetchTopRated();
    }, []);

    const fetchTopRated = () => {
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        })
        .then(res => res.json())
        .then(data => setTopRated(data.results))
        .catch(err => console.error(err));
    }

    const fetchMovies = () => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', {
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        })
        .then(res => res.json())
        .then(data => setMovies(data.results))
        .catch(err => console.error(err));
    }

    const fetchTvSeries = () => {
        fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
            })
        .then(res => res.json())
        .then(data => setTvSeries(data.results))
        .catch(err => console.error(err));
    };

    return(
        <>
            <main>
                <section className='h-45 justify-center relative flex flex-col items-center'>
                    <h1 className='text-white font-Inter-SM text-xl md:text-4xl'>Discover Your Next Favorite Movie</h1>
                    <img src={MoiveBG} className='absolute inset-0 w-full h-full object-cover opacity-25 -z-10' alt="Movie Background" />
                    <div className='container absolute top-40 pr-10 pl-10 lg:pr-[15%] lg:pl-[15%]'>
                        <div className='w-full flex justify-center items-center'>
                            <input
                                type="text"
                                placeholder=""
                                className="bg-white text-black h-10 w-full rounded-tl-sm rounded-bl-sm"
                            />
                            <button className="bg-h-pink text-white flex items-center h-10 p-3 cursor-pointer rounded-tr-sm rounded-br-sm">
                                <MagnifyingGlassIcon className="h-6 w-6 text-black" />
                            </button>
                        </div>
                    </div>
                </section>
                <section className='mt-10 flex items-center flex-col'>
                    <div className='container flex items-center'>
                        <h1 className='text-bg-gray font-Inter-SM text-lg pl-2 md:pl-0 pr-4'>Trending</h1>
                        <button onClick={() => setActiveTab('movie')}
                            className={`px-4 py-1 rounded cursor-pointer font-Inter-SM ${
                                activeTab === 'movie' ? 'bg-h-pink text-white' : 'bg-transparent text-bg-gray'
                            }`}
                            >
                            Movies
                        </button>
                        <button onClick={() => setActiveTab('tv')}
                            className={`px-4 py-1 rounded cursor-pointer font-Inter-SM ${
                                activeTab === 'tv' ? 'bg-h-pink text-white' : 'bg-transparent text-bg-gray'
                            }`}
                            >
                            TV Series
                        </button>
                    </div>
                    <div className="w-full text-white flex justify-center mt-6">
                        <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-6 container pl-8">
                            {activeTab === 'movie' ? ( 
                                movies.map((movie: Media) => (
                                    <MovieCard key={movie.id} movie={movie} mediaType="movie" />
                                ))
                            ) : (
                                tvSeries.map((tv: Media) => (
                                    <MovieCard key={tv.id} movie={tv} mediaType="tv" />
                                ))
                            )}
                        </div>
                    </div>
                </section>
                <section className='mt-10 flex items-center flex-col'>
                    <div className='container'>
                        <h1 className='text-bg-gray font-Inter-SM text-lg pl-2 md:pl-0 pr-4 mb-4'>Top Rated</h1>
                    </div>
                    <div className="flex flex-wrap text-white justify-center lg:justify-start gap-x-4 gap-y-6 container pl-8">
                        {
                            topRated.map((movie: Media) => (
                                <MovieCard key={movie.id} movie={movie} mediaType="movie" />
                            ))
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home