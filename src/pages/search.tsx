import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Media } from "../types/movie";
import MovieCard from "../components/movieCard";

type MediaWithType = Media & { media_type: "movie" | "tv" };

function SearchMovie() {
  const { query } = useParams();
  const [results, setResults] = useState<MediaWithType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const headers = {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        };

        const [movieRes, tvRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
            { headers }
          ),
          fetch(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
            { headers }
          ),
        ]);

        const movieData = await movieRes.json();
        const tvData = await tvRes.json();

        const movieResults: MediaWithType[] = (movieData.results || []).map((item: Media) => ({
          ...item,
          media_type: "movie",
        }));

        const tvResults: MediaWithType[] = (tvData.results || []).map((item: Media) => ({
          ...item,
          media_type: "tv",
        }));

        setResults([...movieResults, ...tvResults]);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="text-white flex justify-center pt-18">
      <div className="container">
        <h1 className=" pl-6 text-sm md:text-2xl font-bold mb-6">Search Results for: "{query}"</h1>

        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
            {results.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} movie={item} mediaType={item.media_type} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchMovie;
