import prisma from "@/server/prisma";
import { User } from "~/types";

export default defineEventHandler(async (event): Promise<User> => {
  const query = getQuery(event);
  const userId = query.userId as string;

  // 在使用者列表中尋找符合指定 user ID 的使用者
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "找不到使用者",
    });
  }

  return user;
});
