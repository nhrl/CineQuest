import React from 'react';
import type { Media } from '../types/movie';
import { truncateTitle, getYear, isLikelyHD } from '../utils/movieUtils';
import { Play } from 'lucide-react';

type MovieCardProps = {
  movie: Media;
  mediaType: 'movie' | 'tv';
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, mediaType }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/fallback.jpg';

  const ratingLabel = mediaType === 'tv' ? 'HD' : isLikelyHD(movie) ? 'HD' : 'CAM';

  return (
    <div key={movie.id} className='relative group'>
      <img
        src={imageUrl}
        loading="lazy"
        alt={movie.title || movie.name || 'Media Poster'}
        className="h-70 rounded-sm group-hover:opacity-50 transition-opacity duration-300"
      />

      <div onClick={() => console.log(movie.id)} className="absolute w-full h-[280px] top-0 flex items-center cursor-pointer justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className='p-2 rounded-full bg-h-pink'>
          <Play className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className='flex font-Inter-SM text-sm text-bg-gray gap-2 mt-1'>
        <h2 className='mr-4 pl-1'>{ratingLabel}</h2>
        <h2>{getYear(movie.release_date || movie.first_air_date || '')}</h2>
        <p className="text-sm text-rating-yellow w-full text-end pr-2">
          {movie.vote_average.toFixed(1)} ★
        </p>
      </div>

      <div className='mt-1 pl-1'>
        <h1 className='font-Inter-SM cursor-pointer hover:text-h-pink'>
          {truncateTitle(movie.title || movie.name || '', 15)}
        </h1>
      </div>
    </div>
  );
};

export default MovieCard;
