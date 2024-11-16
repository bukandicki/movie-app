import movies from "@/lib/data/movies.json";

export default defineEventHandler((event) => {
  return {
    message: "Success",
    data: movies.map((movie) => ({
      ...movie,
      user_ratings: getUsersWhoRatedMovie(movie.id),
      total_ratings: getTotalRatings(movie.id),
    })),
  };
});
