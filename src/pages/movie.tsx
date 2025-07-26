import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import type{Media} from "../types/movie"
const TOTAL_PAGES = 1000;
const PAGE_VISIBLE_LIMIT = 5;


function Movie() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageRange = () => {
    const half = Math.floor(PAGE_VISIBLE_LIMIT / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(TOTAL_PAGES, start + PAGE_VISIBLE_LIMIT - 1);

    if (end - start < PAGE_VISIBLE_LIMIT - 1) {
      start = Math.max(1, end - PAGE_VISIBLE_LIMIT + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const renderPagination = () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {getPageRange().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={page === pageNumber}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            className={page === TOTAL_PAGES ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <div className="p-4 space-y-6 flex items-center flex-col">
        <div className="container mt-15 flex justify-center">
            {renderPagination()}
        </div>
        <section className='mt-2 flex items-center flex-col'>
            <div className="flex flex-wrap text-white justify-center gap-x-4 gap-y-6 container px-8">
                {
                    movies.map((movie: Media) => (
                        <MovieCard key={movie.id} movie={movie} mediaType="movie" />
                    ))
                }
            </div>
        </section>
        <div className="container">
            {renderPagination()}
        </div>
    </div>
  );
}

export default Movie;
