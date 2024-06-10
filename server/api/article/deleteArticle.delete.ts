import { articles } from "../articles";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const articleId = Number(query.id);

  if (!articleId) {
    throw createError({
      statusCode: 400,
      message: "缺少文章ID",
    });
  }

  const articleIndex = articles.value.findIndex((article) => article.id === articleId);

  if (articleIndex === -1) {
    throw createError({
      statusCode: 404,
      message: "找不到文章",
    });
  }

  articles.value.splice(articleIndex, 1);

  return {
    success: true,
    statusCode: 200,
    message: "成功刪除文章！",
  };
});
