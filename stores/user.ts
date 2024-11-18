import type { MOVIE_TYPE, USER_TYPE } from "~/lib/types";

export const useUserStore = defineStore("user_store", () => {
  const user = useState<USER_TYPE | null>("user", () => null);
  const last_views = useState<MOVIE_TYPE[]>("last_views", () => []);
  const voted_movies = useState<MOVIE_TYPE[]>("voted_movies", () => []);

  return {
    user,
    last_views,
    voted_movies,
  };
});
