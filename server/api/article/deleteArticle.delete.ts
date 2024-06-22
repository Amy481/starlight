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

  const deletedArticle = await prisma.article.delete({
    where: { id: articleId },
  });

  if (!deletedArticle) {
    throw createError({
      statusCode: 404,
      message: "找不到文章",
    });
  }

  return {
    success: true,
    statusCode: 200,
    message: "成功刪除文章！",
  };
});
