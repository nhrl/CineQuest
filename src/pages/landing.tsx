import MoiveBG from '../assets/movies.jpg'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FilmIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/outline";


function Landing() {
  return (
    <div className="relative w-full">
      {/* Background image */}
      <img
        src={MoiveBG}
        alt="Movie Background"
        className="absolute inset-0 w-full h-[600px] object-cover opacity-25 -z-10"
      />

      {/* Foreground content */}
      <div className="flex flex-col items-center justify-center h-[600px] text-white pt-10">
        <div className='flex justify-center items-center flex-col'>
            <h1
              className="text-4xl md:text-6xl font-Inter-SM font-bold mb-2 text-text-primary"
              style={{ textShadow: "6px 2px 0 rgba(124, 58, 237, 0.45)" }}
              >
              CineQuest
          </h1>
          <h2 className='text-lg md:text-4xl text-text-primary font-Inter-SM font-semibold mb-6'>Because Movies Are Meant To Be Explored.</h2>
          <div className='w-full flex justify-center items-center mb-6'>
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
        <button className="bg-h-pink p-3 rounded-sm cursor-pointer font-Inter-SM text-md flex gap-2">
          View Full Site
          <ArrowRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/*Why CineQuest*/}
      <div className='flex justify-center flex-col items-center pt-6'>
          <h1 className='text-white font-Inter-SM text-lg md:text-3xl'>Why <span className='text-h-pink'>CineQuest</span></h1>
          <h3 className='text-bg-gray font-Inter-SM text-sm md:text-base font-light mt-2'>Not just another movie site — discover smarter.</h3>
      </div>
      <div className='flex justify-center mt-10 mr-10 ml-10'>
        <div className='container flex flex-col md:flex-row justify-center gap-6'>
            <div className='border-3 rounded-md bg-bg-purple border-h-pink flex flex-col items-center p-4'>
              <FilmIcon className="h-8 w-8 text-white mb-4 mt-4" />
              <h2 className='text-white font-Inter-SM text-lg md:text-xl mb-2'>Every Detail, Every Film</h2>
              <p className='text-bg-gray font-Inter-SM text-sm md:text-base text-center pl-4 pr-4 pb-10'>Dive into cast, synopsis, genres, ratings, and trailers — all in one clean view.</p>
            </div>
            <div className='border-3 rounded-md bg-bg-purple border-h-pink flex flex-col items-center p-4'>
              <MagnifyingGlassIcon className="h-8 w-8 text-white mb-4 mt-4" />
              <h2 className='text-white font-Inter-SM text-lg mb-2 md:text-xl'>Find Anything Instantly</h2>
              <p className='text-bg-gray font-Inter-SM text-sm md:text-base text-center pl-4 pr-4 pb-10'>Search by title, genre, or release year with lightning-fast results powered by TMDb.</p>
            </div>
            <div className='border-3 rounded-md bg-bg-purple border-h-pink flex flex-col items-center p-4'>
              <FireIcon className="h-8 w-8 text-white mb-4 mt-4" />
              <h2 className='text-white font-Inter-SM text-lg mb-2 md:text-xl'>Every Detail, Every Film</h2>
              <p className='text-bg-gray font-Inter-SM text-sm md:text-base text-center pl-4 pr-4 pb-10'>Dive into cast, synopsis, genres, ratings, and trailers — all in one clean view.</p>
            </div>
        </div>
      </div>
      {/* Moive Quotes */}
      <h2 className="mt-20 text-center font-Inter-SM-Italic text-lg md:text-3xl font-semibold mb-4 text-gray-300">
        “ A Quote to Remember ”
      </h2>
      <div className='flex justify-center'>
        <div className='flex flex-col bg-bg-purple p-10 border-2 border-h-pink rounded-md mr-10 ml-10'>
          <h1 className='text-white text-xl font-Inter-SM-Italic mb-4'>“ Movies touch our hearts and awaken our vision. ”</h1>
          <p className='text-bg-gray text-sm md:text-base font-Inter-SM-Italic font-semibold text-right'>— Martin Scorsese</p>
        </div>
      </div>
    </div>
  )
}

export default Landing
