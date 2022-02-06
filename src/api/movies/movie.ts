export interface Movie {
  movieId: string;
  imdbId: string;
  year: number;
  title: string;
  director: string;
  genres: string;
  stars: string;
  runtime: string;
  ratings: {
    metascore: string;
    imdb: string;
  };
  plot: string;
  imageUrlHR: string;
  imageUrlLR: string;
}

export type GetMovieResponse = Movie;
