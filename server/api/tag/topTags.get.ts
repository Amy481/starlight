import { Tag } from "~/types";
import prisma from "@/server/prisma";

interface TopTagsResponse {
  topTags: Tag[];
}

export default defineEventHandler(async (event): Promise<TopTagsResponse> => {
  const query = getQuery(event);
  const userId = query.userId as string;

  const topTags = await prisma.tag.findMany({
    orderBy: userId ? { count: "desc" } : { likes: "desc" },
    take: 10,
    where: userId
      ? {
          articles: {
            some: {
              authorId: userId,
            },
          },
        }
      : {},
  });
  return { topTags };
});
