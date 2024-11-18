import movies from "@/lib/data/movies.json";
import { FILTER_TYPE, MOVIE_TYPE } from "~/lib/types";

export default defineEventHandler((event) => {
  const query = getQuery<FILTER_TYPE>(event);

  let temp: MOVIE_TYPE[] = [];

  const startIndex = (Number(query.page) - 1) * Number(query.limit);
  const endIndex = startIndex + Number(query.limit);

  const formatedData = movies.map((movie) => ({
    ...movie,
    user_ratings: getUsersWhoRatedMovie(movie.id),
    total_ratings: getTotalRatings(movie.id),
  }));

  temp = formatedData;

  if (query.search) {
    temp = formatedData.filter((movie) => {
      const searchQuery = query.search.trim().toLowerCase();

      const fieldsToSearch = [
        movie.title,
        movie.description,
        movie.artists.join(","),
        movie.genres.join(","),
      ];

      return fieldsToSearch.some((field) => {
        return field.toLowerCase().includes(searchQuery);
      });
    });
  }

  return {
    message: "Success",
    data: query.page && query.limit ? temp.slice(startIndex, endIndex) : temp,
    total_pages: Math.ceil(temp.length / (Number(query.limit) || 10)),
    page: startIndex || 1,
    limit: Number(query.limit) || 10,
  };
});
