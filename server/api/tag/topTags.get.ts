import { Tag } from "~/types";
import { articles } from "../articles";

interface TopTagsResponse {
  topTags: Tag[];
}

export default defineEventHandler(async (event): Promise<TopTagsResponse> => {
  const query = getQuery(event);
  const userId = query.userId as string;

  const extractTagsWithLikes = (userId?: string): Tag[] => {
    let filteredArticles = articles.value;
    if (userId) {
      filteredArticles = filteredArticles.filter((article) => article.authorId === userId);
    }

    // 使用 flatMap 將每篇文章的標籤轉換為 { tag, likes } 對象的陣列
    const tagsWithLikes = filteredArticles.flatMap((article) =>
      article.tags.map((tag) => ({ tag, likes: article.likes }))
    );

    // 使用 reduce 方法統計每個標籤的出現次數和總讚數
    const tagStats = tagsWithLikes.reduce<Record<string, Tag>>((tagAccumulator, { tag, likes }) => {
      // 如果標籤已存在於 tagAccumulator 中，則更新計數和讚數
      const existingTagStats = tagAccumulator[tag] || { tag, count: 0, likes: 0 };
      tagAccumulator[tag] = {
        ...existingTagStats,
        count: existingTagStats.count + 1,
        likes: existingTagStats.likes + likes,
      };
      return tagAccumulator;
    }, {});

    // 對結果進行排序
    const sortedTags = Object.values(tagStats);
    if (userId) {
      // 如果有傳入使用者 ID，則按照出現次數降序排列
      sortedTags.sort((a, b) => b.count - a.count);
    } else {
      // 如果沒有傳入使用者 ID，則按照總讚數降序排列
      sortedTags.sort((a, b) => b.likes - a.likes);
    }

    return sortedTags.slice(0, 10);
  };

  const topTags = extractTagsWithLikes(userId);
  return { topTags };
});
