import { USER_TYPE } from "@/lib/types";

import users from "@/lib/data/users.json";

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<USER_TYPE>>(event);

  users.push({
    id: users[users.length - 1].id + 1,
    name: body.name as string,
    email: body.email as string,
    password: body.password as string,
    voted_movies: [],
    last_views: [],
  });

  return {
    message: "User created!",
    data: {
      name: body.name,
      email: body.email,
    },
  };
});
