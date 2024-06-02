import { articles } from "../articles";
import { Article } from "@/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, title, content, cover, tags } = body;

  if (!id || !title || !content) {
    throw createError({
      statusCode: 400,
      message: "缺少必需的輸入內容",
    });
  }
  const articleIndex = articles.value.findIndex((article) => article.id === Number(id));

  if (articleIndex === -1) {
    throw createError({
      statusCode: 404,
      message: "找不到文章",
    });
  }

  const updatedArticle: Article = {
    ...articles.value[articleIndex],
    title,
    content,
    cover: cover || null,
    tags: tags || [],
  };

  articles.value[articleIndex] = updatedArticle;

  return {
    success: true,
    article: updatedArticle,
  };
});
