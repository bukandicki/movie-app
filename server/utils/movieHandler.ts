import users from "@/lib/data/users.json";

/**
 * Finds users who have rated a specific movie.
 * @param id - The ID of the movie to find ratings for.
 * @returns An array of objects containing the user's name and their rating.
 */
export const getUsersWhoRatedMovie = (
  id: number
): Array<{ name: string; rating: number }> => {
  return users.reduce((rated_users, user) => {
    const rating = user.voted_movies.find((vote) => vote.movie_id === id);

    if (rating) {
      rated_users.push({
        name: user.name,
        rating: rating.rating,
      });
    }
    return rated_users;
  }, [] as Array<{ name: string; rating: number }>);
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
