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
  name: string;
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
