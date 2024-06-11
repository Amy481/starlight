import { users } from "./../user";
import { User } from "~/types";

export default defineEventHandler((event): User | null => {
  const query = getQuery(event);
  const userId = query.userId;

  // 在使用者列表中尋找符合指定 user ID 的使用者
  const user = users.value.find((user) => user?.id === userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "找不到使用者",
    });
  }

  return user;
});
