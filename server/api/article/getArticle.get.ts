import prisma from "@/server/prisma";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const articleId = Number(query.id);

  if (!articleId) {
    throw createError({
      statusCode: 400,
      message: "缺少文章ID",
    });
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { tags: true, likedByUsers: true },
  });

  if (!article) {
    throw createError({
      statusCode: 404,
      message: "找不到文章",
    });
  }

  await prisma.article.update({
    where: { id: articleId },
    data: { views: { increment: 1 } },
  });

  return article;
});
