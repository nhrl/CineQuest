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

const genre = [
  { name: 'Action' },
  { name: 'Adventure' },
  { name: 'Animation' },
  { name: 'Comedy' },
  { name: 'Crime' },
  { name: 'Documentary' },
  { name: 'Drama' },
  { name: 'Family' },
  { name: 'Fantasy' },
  { name: 'History' },
  { name: 'Horror' },
  { name: 'Music' },
  { name: 'Mystery' },
  { name: 'Romance' },
  { name: 'Science Fiction' },
  { name: 'TV Movie' },
  { name: 'Thriller' },
  { name: 'War' },
  { name: 'Western' }
]

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setShowNavbar(currentScrollY < lastScrollY || currentScrollY <= 0);
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

  return (
    <nav className={`bg-bg-purple flex  justify-center border-b md:pl-14 border-h-pink p-4 fixed w-full z-50 top-0 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container flex pr-10">
            <div className="flex-1">
                <Link to="/"><img src={cine} alt="CineQuest" className="h-10 cursor-pointer"/></Link>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex flex-2 items-center justify-end">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/Home">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/Movie">Movie</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link to="/Series">TV Series</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Genre
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-wrap justify-center gap-2">
                                    {genre.map((g, index) => (
                                    <li key={index}>
                                        <NavigationMenuLink asChild>
                                        <a href="#" className="border-1 border-bg-gray p-1 hover:bg-h-pink hover:border-white">
                                            {g.name}
                                        </a>
                                        </NavigationMenuLink>
                                    </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
        

        

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white cursor-pointer">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

    {/* Mobile View */}
      {menuOpen && (
        <div className="z-20 absolute top-[73px] left-0 w-full bg-bg-purple text-white px-6 py-4  md:hidden">
          <ul className="space-y-4">
            <li><a href="/Home">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">TV Series</a></li>
          </ul>
          <h1 className='mt-4 text-bg-gray mb-2'>Genre</h1>
          <ul className='flex flex-wrap gap-y-4 gap-x-2'>
            {genre.map((g, index) => (
              <li key={index}>
                  <a href="#" className="rounded-md border-1 border-bg-gray p-1 hover:bg-h-pink hover:border-white">
                      {g.name}
                  </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
    
  )
}



export default Navbar