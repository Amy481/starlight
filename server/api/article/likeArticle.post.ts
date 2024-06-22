import prisma from "@/server/prisma";

export default defineEventHandler(async (event) => {
  // 獲取文章 ID 和用戶資訊
  const { id, userId } = await readBody(event);

  // 在文章列表中找到該文章
  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
    include: { likedByUsers: true },
  });
  if (!article) {
    throw createError({
      statusCode: 404,
      message: "找不到該文章",
    });
  }

  const likedByUser = article.likedByUsers.find((user) => user.id === userId);

  if (likedByUser) {
    // 如果用戶已經點過讚，則將其從 likedByUsers 中移除
    await prisma.article.update({
      where: { id: Number(id) },
      data: {
        likes: { decrement: 1 },
        likedByUsers: { disconnect: { id: userId } },
      },
    });
  } else {
    // 否則將用戶 ID 添加到 likedByUsers 中，並將 likes 數量增加
    await prisma.article.update({
      where: { id: Number(id) },
      data: {
        likes: { increment: 1 },
        likedByUsers: { connect: { id: userId } },
      },
    });
  }

  const updatedArticle = await prisma.article.findUnique({
    where: { id: Number(id) },
    include: { likedByUsers: true },
  });

  return {
    success: true,
    likes: updatedArticle?.likes,
    likedByUsers: updatedArticle?.likedByUsers,
  };
});
