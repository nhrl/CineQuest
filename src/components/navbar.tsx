"use client"

import { useState } from 'react';
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

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-bg-purple border-b-1 border-b-h-pink p-4 flex justify-center">
        <div className="container flex">
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
                                <ul className="grid w-[100px] gap-4">
                                <li>
                                    <NavigationMenuLink asChild>
                                    <a href="#" className="flex-row items-center gap-2 hover:bg-h-pink">
                                        Backlog
                                    </a>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                    <a href="#" className="flex-row items-center gap-2 hover:bg-h-pink">
                                        To Do
                                    </a>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                    <a href="#" className="flex-row items-center gap-2 hover:bg-h-pink">
                                        Done
                                    </a>
                                    </NavigationMenuLink>
                                </li>
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
        <div className="absolute top-20 left-0 w-full bg-bg-purple text-white px-6 py-4 md:hidden">
          <ul className="space-y-4">
            <li><a href="#">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">TV Series</a></li>
            <li><a href="#">Action</a></li>
            <li><a href="#">Drama</a></li>
            <li><a href="#">Comedy</a></li>
            <li><a href="#">Sci-Fi</a></li>
          </ul>
        </div>
      )}
    </nav>
    
  )
}



export default Navbar