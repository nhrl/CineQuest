import MoiveBG from '../assets/movies.jpg'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import f1 from '../assets/f1.jpg'
import { Play } from 'lucide-react';

function Home() {
    const [activeTab, setActiveTab] = useState<'movie' | 'tv'>('movie');

    const renderMovies = () => {
    return (
        <>
        <div className='relative group'>
            <img
                src={f1}
                alt="F1 The Movie"
                className="h-70 rounded-sm group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="absolute w-full h-[280px] top-0 flex items-center cursor-pointer justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className='p-2 rounded-full bg-h-pink'>
                    <Play className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
            </div>
            <div className='flex font-Inter-SM text-sm text-bg-gray gap-2 mt-1'>
                <h2 className='mr-4 pl-1'>HD</h2>
                <h2>2025</h2>
                <h2 className='text-end w-full pr-2'>140m</h2>
            </div>
            <div className='mt-1 pl-1'>
                <h1 className='font-Inter-SM cursor-pointer hover:text-h-pink'>F1: The Movie</h1>
            </div>
        </div>
        </>
       
        );
    };

    const renderTVSeries = () => {
        return (
        <div>
            {/* Replace with your actual TV series components */}
            <p>TV Series content here</p>
        </div>
        );
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
                        <h1 className='text-bg-gray font-Inter-SM text-base pl-2 md:pl-0 pr-4'>Trending</h1>
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
                    <div className="w-full text-white flex justify-center mt-4">
                        <div className="flex container pl-2 pr-2 md:pl-0">
                            {activeTab === 'movie' ? ( renderMovies() ) : ( renderTVSeries())}
                        </div>
                    </div>
                </section>
                <section className='mt-10 flex justify-center'>
                    <div className='container border-1'>
                        <h1 className='text-bg-gray font-Inter-SM text-base pl-2 md:pl-0 pr-4'>Movie</h1>
                    </div>
                </section>
                <section className='mt-10 flex justify-center'>
                    <div className='container border-1'>
                        <h1 className='text-bg-gray font-Inter-SM text-base pl-2 md:pl-0 pr-4'>TV Series</h1>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home