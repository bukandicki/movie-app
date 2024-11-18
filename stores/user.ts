import type { API_RESPONSE_TYPE, MOVIE_TYPE, USER_TYPE } from "~/lib/types";

export const useUserStore = defineStore("user_store", () => {
  const user = useState<USER_TYPE | null>("user", () => null);
  const last_views = useState<MOVIE_TYPE[]>("last_views", () => []);
  const voted_movies = useState<MOVIE_TYPE[]>("voted_movies", () => []);

  async function GET_USER(
    id: number
  ): Promise<API_RESPONSE_TYPE<USER_TYPE> | undefined> {
    try {
      const data = await $fetch<API_RESPONSE_TYPE<USER_TYPE>>(
        `/api/users/${id}`,
        {
          method: "GET",
        }
      );

      user.value = data.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function UPDATE_USER(
    id: number,
    payload: Partial<Omit<USER_TYPE, "id">>
  ): Promise<API_RESPONSE_TYPE<USER_TYPE> | undefined> {
    try {
      const data = await $fetch<API_RESPONSE_TYPE<USER_TYPE>>(
        `/api/users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
        }
      );

      user.value = data.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    user,
    last_views,
    voted_movies,
    GET_USER,
    UPDATE_USER,
  };
});
