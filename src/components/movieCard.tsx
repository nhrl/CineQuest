import React from 'react';
import type { Media } from '../types/movie';
import { truncateTitle, getYear, isLikelyHD } from '../utils/movieUtils';
import { Play } from 'lucide-react';
import noImage from '../assets/no-images.jpg'
import { useNavigate } from 'react-router-dom';

type MovieCardProps = {
  movie: Media;
  mediaType: 'movie' | 'tv';
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, mediaType }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `${noImage}`;

  const navigate = useNavigate();
  const ratingLabel = mediaType === 'tv' ? 'HD' : isLikelyHD(movie) ? 'HD' : 'CAM';

  const displayMedia = (id : number, type : string, title : string) => {
      
    if(type === 'movie')
    {
      navigate(`/movie-display/${title}-${id}`);
    } else {
      navigate(`/tv-display/${title}-${id}`);
    }
  }

  return (
    <div key={movie.id} className='relative group'>
      <img
        src={imageUrl}
        loading="lazy"
        alt={movie.title || movie.name || 'Media Poster'}
        className="h-50 md:h-70 rounded-sm group-hover:opacity-50 transition-opacity duration-300"
      />

      <div onClick={() => displayMedia(movie.id, mediaType, movie.title || movie.name || '')} className="absolute w-full h-[200px] md:h-[280px] top-0 flex items-center cursor-pointer justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className='p-2 rounded-full bg-h-pink'>
          <Play className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className='flex items-center font-Inter-SM text-[10px] md:text-sm pl-1 text-bg-gray gap-2 mt-1 md:mt-[4px]'>
        <h2>{ratingLabel}</h2>
        <h2>{getYear(movie.release_date || movie.first_air_date || '')}</h2>
        <p className="text-[10px] md:text-sm shadow-md text-rating-yellow w-full text-end pr-2">
          {movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "N/A"} ★
        </p>
      </div>

      <div className='pl-1 mt-[1px] md:mt-[2px]'>
        <h1 className='font-Inter-SM text-[12px] md:text-[16px] cursor-pointer hover:text-h-pink' onClick={() => displayMedia(movie.id, mediaType, movie.title || movie.name || '')}>
          {truncateTitle(movie.title || movie.name || '', 15)}
        </h1>
      </div>
    </div>
  );
};

export default MovieCard;
