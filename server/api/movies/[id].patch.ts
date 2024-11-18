import { MOVIE_TYPE } from "@/lib/types";

import movies from "@/lib/data/movies.json";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<Partial<Omit<MOVIE_TYPE, "id">>>(event);

  const movie_index = movies.findIndex(
    (movie) => movie.id === parseInt(id as string)
  );

  movies[movie_index] = { ...movies[movie_index], ...body };

  return { message: "Movie updated!", data: movies[movie_index] };
});
