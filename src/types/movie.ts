export type Media = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  vote_average: number;
  popularity: number;
  vote_count: number;
  media_type?: 'movie' | 'tv';
};
