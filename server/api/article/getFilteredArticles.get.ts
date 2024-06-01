import { articles } from "../articles";
import { ArticleData, Article } from "~/types";

type ArticleKey = keyof Article;

export default defineEventHandler((event): ArticleData => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const sortBy = (query.sortBy as ArticleKey) || "id";
  const sortOrder = (query.sortOrder as string) || "desc";

  // 根據排序條件對文章進行排序
  const sortedArticles = [...articles.value].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (valueA === null && valueB === null) {
      return 0;
    } else if (valueA === null) {
      return 1;
    } else if (valueB === null) {
      return -1;
    }

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const articleList = sortedArticles.slice(startIndex, endIndex);

  return {
    articles: articleList,
    hasMore: endIndex < sortedArticles.length,
  };
});
