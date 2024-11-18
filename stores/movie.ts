import type { API_RESPONSE_TYPE, FILTER_TYPE, MOVIE_TYPE } from "~/lib/types";

export const useMovieStore = defineStore("movie_store", () => {
  const movies = useState<API_RESPONSE_TYPE<MOVIE_TYPE[]>>("movies", () => ({
    data: [],
    message: "",
  }));
  const movie_filter = useState<FILTER_TYPE>("movie_filter", () => ({
    search: "",
    page: 1,
    limit: 10,
  }));

  async function FETCH_MOVIES(): Promise<
    API_RESPONSE_TYPE<MOVIE_TYPE[]> | undefined
  > {
    const data = await $fetch<API_RESPONSE_TYPE<MOVIE_TYPE[]>>("/api/movies", {
      query: movie_filter.value,
    });

    movies.value = data;

    return data;
  }

  return { movies, movie_filter, FETCH_MOVIES };
});
