import prisma from "@/server/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, content, cover, tags, authorId, authorName } = body;

  if (!title || !content || !authorId) {
    throw createError({
      statusCode: 400,
      message: "缺少必需的輸入內容",
    });
  }

  const newArticle = await prisma.article.create({
    data: {
      title,
      content,
      cover: cover || null,
      authorId,
      authorName,
      date: new Date().toLocaleString(),
      likes: 0,
      replies: 0,
      views: 0,
      tags: {
        connectOrCreate:
          tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag, count: 1, likes: 0 },
          })) || [],
      },
    },
  });

  return {
    success: true,
    article: newArticle,
  };
});
