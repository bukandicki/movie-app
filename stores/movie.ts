import type { API_RESPONSE_TYPE, FILTER_TYPE, MOVIE_TYPE } from "~/lib/types";

export const useMovieStore = defineStore("movie_store", () => {
  const movie_detail = useState<MOVIE_TYPE | null>("movie_detail", () => null);
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
    try {
      const data = await $fetch<API_RESPONSE_TYPE<MOVIE_TYPE[]>>(
        "/api/movies",
        {
          query: movie_filter.value,
        }
      );

      movies.value = data;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function FETCH_MOVIE_DETAIL(
    id: number
  ): Promise<MOVIE_TYPE | undefined> {
    try {
      const data = await $fetch<API_RESPONSE_TYPE<MOVIE_TYPE>>(
        `/api/movies/${id}`
      );

      movie_detail.value = data.data;

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function CREATE_MOVIE(payload: Omit<MOVIE_TYPE, "id">) {
    try {
      await $fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function UPDATE_MOVIE(
    id: number,
    payload: Partial<Omit<MOVIE_TYPE, "id">>
  ) {
    try {
      await $fetch(`/api/movies/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    movies,
    movie_detail,
    movie_filter,
    FETCH_MOVIES,
    CREATE_MOVIE,
    UPDATE_MOVIE,
    FETCH_MOVIE_DETAIL,
  };
});
