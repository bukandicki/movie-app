import { USER_TYPE } from "@/lib/types";

import users from "@/lib/data/users.json";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<Partial<Omit<USER_TYPE, "id">>>(event);

  const user_index = users.findIndex(
    (movie) => movie.id === parseInt(id as string)
  );

  users[user_index] = { ...users[user_index], ...body };

  return { message: "User updated!", data: users[user_index] };
});
