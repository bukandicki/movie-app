export type FILTER_TYPE = {
  search: string;
  page: number;
  limit: number;
};

export type API_RESPONSE_TYPE<T> = {
  message: string;
  data: T;
  total_pages?: number;
  page?: number;
  limit?: number;
};

export type USER_VOTE_TYPE = {
  movie_id: number;
  rating: number;
};

export type USER_TYPE = {
  id: number;
  name: string;
  email: string;
  password: string;
  voted_movies: USER_VOTE_TYPE[];
  last_views: number[];
};

export type USER_RATE = {
  id: number;
  rating: number;
};

export type MOVIE_TYPE = {
  id: number;
  title: string;
  description: string;
  duration: string;
  artists: string[];
  watched_by: number[];
  genres: string[];
  thumbnail: string;
  watch_url: string;
  views: number;
  user_ratings: USER_RATE[];
  total_ratings: number;
};
