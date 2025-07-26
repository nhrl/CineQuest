import type { Media } from '../types/movie';
export function truncateTitle(title: string, maxLength: number): string {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength).trimEnd() + "...";
}


export function getYear(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

export function isLikelyHD(movie: Media): boolean {
  const today = new Date();
  const releaseDateStr = movie.release_date || movie.first_air_date;
  
  if (!releaseDateStr) return false;

  const releaseDate = new Date(releaseDateStr);
  const daysSinceRelease = (today.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24);

  const isReleasedMoreThan30Days = daysSinceRelease > 30;
  const isPopular = movie.popularity > 150;
  const hasEnoughVotes = movie.vote_count > 100;

  return isReleasedMoreThan30Days && (isPopular || hasEnoughVotes);
}
