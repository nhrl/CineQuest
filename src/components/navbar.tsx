"use client"

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import cine from '../assets/cine.png'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface Genre {
  id: number;
  name: string;
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    const showSearchBar = [
    "/movie",
    "/series",
    "/search",
    "/movie-display",
    "/tv-display",
    "/genre",
    ].some(path => location.pathname.startsWith(path));

    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);


    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowNavbar(currentScrollY < lastScrollY || currentScrollY <= 0);
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleSearch = () => {
      if (searchValue.trim()) {
        navigate(`/search/${encodeURIComponent(searchValue.trim())}`);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const [movieRes, tvRes] = await Promise.all([
                    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }),
                    fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    })
                ]);

                const movieData = await movieRes.json();
                const tvData = await tvRes.json();

                setMovieGenres(movieData.genres);
                setTvGenres(tvData.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const renderGenreLinks = (mediaType: 'movie' | 'tv', genres: Genre[]) => (
        genres.map((genre) => (
            <li key={genre.id}>
                <NavigationMenuLink asChild>
                    <Link 
                        to={`/genre/${genre.id}-${mediaType}-${genre.name}`} 
                        className="border-1 border-bg-gray p-1 hover:bg-h-pink hover:border-white"
                    >
                        {genre.name}
                    </Link>
                </NavigationMenuLink>
            </li>
        ))
    );

    const renderMobileGenreLinks = (mediaType: 'movie' | 'tv', genres: Genre[]) => (
      genres.map((genre) => (
          <li key={genre.id}>
              <Link 
                  to={`/genre/${genre.id}-${mediaType}-${genre.name}`} 
                  className="text-sm border border-bg-gray p-1 rounded hover:bg-h-pink hover:border-white"
                  onClick={() => setMenuOpen(false)}
              >
                  {genre.name}
              </Link>
          </li>
      ))
    );

  return (
    <nav className={`bg-bg-purple flex justify-center border-b border-h-pink p-4 fixed w-full z-50 top-0 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container flex items-center px-2">
            <div className="flex-1">
                <Link to="/"><img src={cine} alt="CineQuest" className="h-10 cursor-pointer"/></Link>
            </div>
            {/* This will open the search for mobile view */}
            {showSearchBar && (
              <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className='block pr-4 md:hidden'>
                <MagnifyingGlassIcon className="h-6 w-6 text-white ml-2 cursor-pointer" />
              </button>
            )}
            {/* Desktop View */}
            <div className={`hidden md:flex flex-2 items-center pl-10 ${showSearchBar ? 'justify-center' : 'justify-end'}`}>
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/home">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/movie">Movie</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/series">TV Series</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Genre
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4">
                                    <h3 className="mb-2 font-semibold text-white">Movie Genres</h3>
                                    <ul className="flex flex-wrap justify-center gap-2">
                                        {renderGenreLinks('movie', movieGenres)}
                                    </ul>
                                    <h3 className="mt-4 mb-2 font-semibold text-white">TV Show Genres</h3>
                                    <ul className="flex flex-wrap justify-center gap-2">
                                        {renderGenreLinks('tv', tvGenres)}
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            {showSearchBar && (
              <div className='flex-1 hidden lg:flex items-center mr-4'>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search movie or series"
                  className='w-full border-1 outline-none text-white pl-4 h-9 rounded-[4px]'
                />
                <button onClick={handleSearch}>
                  <MagnifyingGlassIcon className='h-6 w-6 text-white ml-2 cursor-pointer'/>
                </button>
              </div>
            )}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white cursor-pointer">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
            {showSearchBar && (
              <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className='pr-4 hidden md:block lg:hidden'>
                <MagnifyingGlassIcon className="h-6 w-6 text-white ml-2 cursor-pointer" />
              </button>
            )}
        </div>
      {/* Mobile View */}
      {menuOpen && (
        <div className="z-20 absolute top-[73px] left-0 w-full bg-bg-purple text-white px-6 py-4 md:hidden">
            <ul className="space-y-4">
                <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/movie" onClick={() => setMenuOpen(false)}>Movies</Link></li>
                <li><Link to="/series" onClick={() => setMenuOpen(false)}>TV Series</Link></li>
            </ul>
            <h1 className='mt-4 text-bg-gray mb-2'>Movie Genres</h1>
            <ul className='flex flex-wrap gap-y-4 gap-x-2'>
                {renderMobileGenreLinks('movie', movieGenres)}
            </ul>
            <h1 className='mt-4 text-bg-gray mb-2'>TV Genres</h1>
            <ul className='flex flex-wrap gap-y-4 gap-x-2'>
                {renderMobileGenreLinks('tv', tvGenres)}
            </ul>
        </div>
      )}

      {/* Displaying the search bar*/}
      {isMobileSearchOpen && (
        <div 
          className={`fixed top-0 left-0 w-full z-50 bg-bg-purple h-18 flex items-center justify-center lg:hidden transform transition-transform duration-300 ease-in-out ${
            isMobileSearchOpen ? 'translate-y-0' : '-translate-y-[-100%]'
          }`}
        >
          <div className='container flex justify-center px-5'>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search movie or series"
                className="flex-1 p-2 rounded text-white border-1"
              />
              <button onClick={handleSearch}>
                <MagnifyingGlassIcon className="h-6 w-6 text-white ml-2 cursor-pointer" />
              </button>
              <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                <X className="h-6 w-6 text-white ml-2 cursor-pointer"/>
              </button>
          </div>  
        </div>
      )}
    </nav>
    
  )
}



export default Navbar