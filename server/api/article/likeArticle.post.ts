import { articles } from "../articles";

export default defineEventHandler(async (event) => {
  // 獲取文章 ID 和用戶資訊
  const { id, userId } = await readBody(event);

  // 在文章列表中找到該文章
  const article = articles.value.find((article) => article.id === Number(id));
  if (!article) {
    throw createError({
      statusCode: 404,
      message: "找不到該文章",
    });
  }

  // 如果用戶已經點過讚，則將其從 likedByUsers 中移除
  const index = article.likedByUsers.indexOf(userId);
  if (index !== -1) {
    article.likedByUsers.splice(index, 1);
    article.likes--;
  } else {
    // 否則將用戶 ID 添加到 likedByUsers 中，並將 likes 數量增加
    article.likedByUsers.push(userId);
    article.likes++;
  }

  return { success: true, likes: article.likes, likedByUsers: article.likedByUsers };
});
