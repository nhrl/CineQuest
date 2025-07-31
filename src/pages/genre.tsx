import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCard from '../components/movieCard';
import type { Media } from '../types/movie';

function Genre() {
  const { query } = useParams();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchByGenre = async () => {
      try {
        // Decode the genre ID from the URL
        const genreId = query?.split('-')[0];
        const mediaType = query?.split('-')[1]; // 'movie' or 'tv'

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/${mediaType}?` +
          `with_genres=${genreId}&language=en-US&sort_by=popularity.desc`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        setMedia(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genre data:', error);
        setLoading(false);
      }
    };

    fetchByGenre();
  }, [query]);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex justify-center">
      <div className="container mt-6 px-2">
        <h1 className="text-white text-2xl mb-6 font-Inter-SM">
          {query?.split('-')[2]}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6">
          {media.map((item) => {
            const type = query?.split('-')[1];
            const mediaType: 'movie' | 'tv' = type === 'tv' ? 'tv' : 'movie';
            return (
              <MovieCard 
                key={item.id} 
                movie={item} 
                mediaType={mediaType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Genre;