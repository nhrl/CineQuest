import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getYear } from "../../utils/movieUtils";
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import MovieCard from '../../components/movieCard';
import type { Media } from '../../types/movie';
import { X } from 'lucide-react';

// --- Poster and Backdrop ---
function MovieBackdrop({ backdrop, title }: { backdrop: string, title: string }) {
  if (!backdrop) return null;
  return (
    <img src={backdrop} alt={title} className='absolute inset-0 w-full h-full object-cover opacity-50 -z-10' />
  );
}

function MoviePoster({ poster, title }: { poster: string, title: string }) {
  if (!poster) return null;
  return (
    <img src={poster} alt={title} className="h-50 lg:h-90 rounded-md" />
  );
}

function TrailerModal({ isOpen, onClose, videoId }: { isOpen: boolean; onClose: () => void; videoId: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full h-[56.25vw] max-w-4xl max-h-[75vh]">
        <button
          onClick={onClose}
          className="absolute -top-8 right-2 lg:right-0 text-white hover:text-gray-300"
        >
          <X className="cursor-pointer"/>
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// --- Movie Details ---
function MovieDetails({ movie }: { movie: any }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string>('');

  const handleTrailerClick = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      const trailer = data.results.find((video: any) => 
        video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  return (
    <div className="p-2 md:w-4/5 lg:w-1/2">
      <h1 className="text-xl md:text-4xl font-Inter-SM">{movie.title}</h1>
      <p className="font-Inter-SM-Italic text-sm text-gray-300 mb-2">{movie.tagline}</p>
      <div className="flex gap-2 md:gap-4">
        <p className="text-[12px] md:text-[14px] font-Inter-SM">{getYear(movie.release_date || movie.first_air_date || '')}</p>
        <div className="flex cursor-pointer" onClick={handleTrailerClick}>
          <VideoCameraIcon className="h-4 md:h-5" />
          <p className="text-[12px] md:text-[14px] font-Inter-SM pl-1">Trailer</p>
        </div>
        <p className="text-[12px] md:text-[14px] font-Inter-SM shadow-md text-rating-yellow">
          {movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "N/A"} ★
        </p>
        <p className="text-[12px] md:text-[14px] font-Inter-SM">{movie.runtime}m</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-1">Overview</h2>
        <p className="text-[13px] md:text-sm text-gray-300 font-Inter-SM">{movie.overview}</p>
      </div>
      <div className="flex flex-wrap mt-2 items-center gap-1">
        <strong className="font-semibold text-sm">Genre:</strong>
        {movie.genres?.map((g: any) => (
          <span key={g.id} className="text-sm">{g.name}</span>
        ))}
      </div>
      <div className="text-sm space-y-1">
        <p><strong className="font-semibold text-sm">Language:</strong> {movie.original_language?.toUpperCase()}</p>
        <p>
          <strong>Spoken Languages:</strong>{" "}
          {movie.spoken_languages?.map((lang: any) => lang.english_name).join(", ")}
        </p>
        <p>
          <strong>Country:</strong>{" "}
          {movie.production_countries?.map((c: any) => c.name).join(", ")}
        </p>
        <div className="flex md:mr-40">
          <h2 className="font-semibold mr-1">Production:</h2>
          <ul className="text-sm flex flex-wrap gap-x-2">
            {movie.production_companies?.map((company: any) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex mt-2 justify-center md:justify-start">
        {movie.homepage && (
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-h-pink font-Inter-SM text-[12px] md:text-sm px-2 py-2 rounded hover:bg-[#660ffa]  transition"
          >
            Visit Official Site
          </a>
        )}
      </div>
      <TrailerModal 
        isOpen={showTrailer} 
        onClose={() => setShowTrailer(false)} 
        videoId={trailerKey} 
      />
    </div>
  );
}

// --- Top Cast ---
function TopCast({ cast }: { cast: any[] }) {
  if (!cast?.length) return null;
  return (
    <div className="flex justify-center">
      <div className="container">
        <h1 className="text-white font-Inter-SM text-lg md:text-2xl pl-5 mb-2 mt-4">
          Top Cast
        </h1>
        <div className="text-white flex flex-wrap gap-4 lg:gap-14 justify-center">
          {cast.slice(0, 6).map((member: any) => (
            <div key={member.id} className="flex">
              <div className="flex flex-col justify-center">
                <img className="w-18 h-17 md:w-30 md:h-28 rounded-full" src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
                <p className="text-[12px] md:text-sm text-center">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Similar Movies ---
function SimilarMovies({ similar }: { similar: Media[] }) {
  if (!similar?.length) return null;
  return (
    <section className='mt-10 flex items-center flex-col'>
      <div className='container'>
        <h1 className='text-bg-gray font-Inter-SM text-sm md:text-lg pl-2 md:pl-0 pr-4 mb-4'>Similar Movies</h1>
      </div>
      <div className="flex flex-wrap text-white justify-center gap-x-4 gap-y-6 container">
        {similar.map((movie: Media) => (
          <MovieCard key={movie.id} movie={movie} mediaType="movie" />
        ))}
      </div>
    </section>
  );
}

// --- Main MovieDisplay ---
function MovieDisplay() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || '');
  const id = decodedQuery.split('-').pop();

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similar, setSimilar] = useState<Media[]>([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieRes, castRes, similarRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }),
          fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }),
        ]);

        if (!movieRes.ok || !castRes.ok || !similarRes.ok) {
          throw new Error("One or more API requests failed");
        }

        const [movieData, castData, similarData] = await Promise.all([
          movieRes.json(),
          castRes.json(),
          similarRes.json(),
        ]);

        setMovie({ ...movieData, cast: castData.cast });
        setSimilar(similarData.results || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  if (loading) return <div className="text-white">Loading movie...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';

  const backdrop = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : '';

  return (
    <>
      <div className="text-white relative flex items-center justify-center lg:h-150">
        <MovieBackdrop backdrop={backdrop} title={movie.title} />
        <div className="p-4 md:pl-8 md:pt-6 lg:flex lg:pt-0 lg:justify-center">
          <div className="flex justify-center p-2 md:justify-start lg:mr-8 mb-4">
            <MoviePoster poster={poster} title={movie.title} />
          </div>
          <MovieDetails movie={movie} />
        </div>
      </div>
      <TopCast cast={movie.cast} />
      <SimilarMovies similar={similar} />
    </>
  );
}

export default MovieDisplay;
