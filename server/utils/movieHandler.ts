import users from "@/lib/data/users.json";
import { MOVIE_TYPE } from "~/lib/types";

/**
 * Finds users who have rated a specific movie.
 * @param id - The ID of the movie to find ratings for.
 * @returns An array of objects containing the user's id and their rating.
 */
export const getUsersWhoRatedMovie = (
  id: number
): Array<{ id: number; rating: number }> => {
  return users.reduce((rated_users, user) => {
    const rating = user.voted_movies.find((vote) => vote.movie_id === id);

    if (rating) {
      rated_users.push({
        id: user.id,
        rating: rating.rating,
      });
    }
    return rated_users;
  }, [] as Array<{ id: number; rating: number }>);
};

/**
 * Finds users movies.
 * @param id - The ID of the user's videos to find their Movies.
 * @returns An array of objects containing the movie object.
 */
export const findUserMovies = (
  ids: number[],
  movies: MOVIE_TYPE[]
): MOVIE_TYPE[] => {
  return movies.filter((movie) => ids.includes(movie.id));
};

/**
 * Count total rating
 * @param id - The ID of the movie to find ratings for.
 * @returns Total rating by reduce all rated users
 */
export const getTotalRatings = (id: number): number => {
  return getUsersWhoRatedMovie(id).reduce(
    (accumulator, current, _, lists) =>
      accumulator + current.rating / lists.length,
    0
  );
};
