import movies from "@/lib/data/movies.json";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const movie = movies.find((movie) => movie.id === parseInt(id as string));

  if (movie)
    return {
      message: "Success",
      data: {
        ...movie,
        user_ratings: getUsersWhoRatedMovie(movie.id),
        total_ratings: getTotalRatings(movie.id),
      },
    };

  return { message: "Movie not found!", data: null };
});
