import prisma from "@/server/prisma";
import { ArticleData, Article } from "~/types";

//  Article 型別的屬性鍵
type ArticleKey = keyof Article;

export default defineEventHandler(async (event): Promise<ArticleData> => {
  // 獲取查詢參數（query）
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = 10;
  const sortBy = (query.sortBy as ArticleKey) || "id";
  const sortOrder = (query.sortOrder as string) || "desc";
  const tag = query.tag as string;
  const userId = query.userId as string;

  // 根據查詢條件過濾文章
  const where: any = {};
  if (tag) {
    where.tags = { some: { name: tag } };
  }
  if (userId) {
    where.authorId = userId;
  }

  const articleCount = await prisma.article.count({ where });
  const articles = await prisma.article.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    skip: (page - 1) * limit,
    take: limit,
    include: { tags: true, likedByUsers: true },
  });

  return {
    articles,
    hasMore: page * limit < articleCount,
  };
});
