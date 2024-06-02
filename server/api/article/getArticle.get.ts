import { articles } from "../articles";
export default defineEventHandler((event) => {
  const query = getQuery(event);
  const articleId = Number(query.id);

  if (!articleId) {
    throw createError({
      statusCode: 400,
      statusMessage: "缺少文章ID",
    });
  }

  const article = articles.value.find((article) => article.id === articleId);

  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: "找不到文章",
    });
  }

  return article;
});
