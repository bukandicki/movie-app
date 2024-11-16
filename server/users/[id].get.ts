import users from "@/lib/data/users.json";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const user = users.find((user) => user.id === parseInt(id as string));

  if (user) return { message: "Success", data: user };

  return { message: "User not found!", data: null };
});
