import { articles } from "../articles";
import { Article } from "@/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, content, cover, tags, authorId, authorName } = body;

  if (!title || !content || !authorId) {
    throw createError({
      statusCode: 400,
      message: "缺少必需的輸入內容",
    });
  }

  const newAuthorId =
    articles.value.length > 0 ? Math.max(...articles.value.map((article) => article.id)) + 1 : 1;
  const newArticle: Article = {
    id: newAuthorId,
    title,
    content,
    cover: cover || null,
    tags: tags || [],
    authorId,
    authorName,
    date: new Date().toLocaleString(),
    likes: 0,
    replies: 0,
    views: 0,
  };

  articles.value.unshift(newArticle);

  return {
    success: true,
    article: newArticle,
  };
});
