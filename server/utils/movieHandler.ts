import users from "@/lib/data/users.json";

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
