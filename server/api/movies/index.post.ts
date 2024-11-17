import { MOVIE_TYPE } from "@/lib/types";

import movies from "@/lib/data/movies.json";

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<MOVIE_TYPE, "id">>(event);

  movies.push({
    id: movies[movies.length - 1].id + 1,
    ...body,
  });

  return {
    message: "Movie created!",
    data: { ...body },
  };
});
