export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
}

export interface State {
  search: string;
  results: string[];
  selected: Movie;
  favorites: Movie[];
  deleted: Movie[];
}

export interface movieDetail {
  movie: State;
  setState: (value: any) => void;
  setDeleted: any;
  setFav: any;
}
