import { Tag } from "~/types";
import { articles } from "../articles";

export default defineEventHandler(async () => {
  const extractTagsWithLikes = (): Tag[] => {
    // 使用 flatMap 將每篇文章的標籤轉換為 { tag, likes } 對象的陣列
    const tagsWithLikes = articles.value.flatMap((article) =>
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

    // 對結果進行排序，按照總讚數降序排列，並取前 10 個
    return Object.values(tagStats)
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
  };

  const topTags = extractTagsWithLikes();
  return { topTags };
});
