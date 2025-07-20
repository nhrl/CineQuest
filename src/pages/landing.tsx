import MoiveBG from '../assets/movies.jpg'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from "@heroicons/react/24/outline";


function Landing() {
  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <img
        src={MoiveBG}
        alt="Movie Background"
        className="absolute inset-0 w-full h-3/4 object-cover opacity-25 -z-10"
      />

      {/* Foreground content */}
      <div className="flex flex-col items-center justify-center h-3/4 text-white pt-10">
        <div className='flex justify-center items-center flex-col'>
            <h1
              className="text-4xl md:text-8xl font-Inter-SM font-bold mb-2 text-text-primary"
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
        <button className="bg-h-pink p-4 rounded-sm cursor-pointer font-Inter-SM flex gap-4">
          View Full Site
          <ArrowRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  )
}

export default Landing
