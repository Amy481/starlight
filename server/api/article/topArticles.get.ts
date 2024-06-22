import { Article } from "@/types";
import prisma from "@/server/prisma";

export default defineEventHandler(async () => {
  async function getTopArticles(): Promise<Article[]> {
    const topArticles = await prisma.article.findMany({
      orderBy: { likes: "desc" },
      take: 3,
      include: { tags: true, likedByUsers: true },
    });
    return topArticles;
  }

  const topArticles = await getTopArticles();

  return {
    topArticles,
  };
});
