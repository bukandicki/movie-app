import users from "@/lib/data/users.json";

export default defineEventHandler((event) => {
  return { message: "Success", data: users };
});
