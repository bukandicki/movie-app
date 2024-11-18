export default defineEventHandler(async (event) => {
  const query = getQuery<{ ids: string }>(event);

  const data = await $fetch("/api/movies", {
    query: { limit: 1000 },
  });

  const ids = query.ids.split(",").map(Number);

  return { message: "Success", data: findUserMovies(ids, data.data) };
});
