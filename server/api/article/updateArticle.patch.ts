import prisma from "@/server/prisma";
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
  const updatedArticle = await prisma.article.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      cover: cover || null,
      tags: {
        connectOrCreate: tags.map((tag: string) => ({
          where: { name: tag },
          create: { name: tag, count: 1, likes: 0 },
        })),
      },
    },
    include: { tags: true },
  });

  if (!updatedArticle) {
    throw createError({
      statusCode: 404,
      message: "找不到文章",
    });
  }

  return {
    success: true,
    article: updatedArticle,
  };
});
