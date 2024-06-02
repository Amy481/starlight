import { articles } from "../articles";
import { ArticleData, Article } from "~/types";

//  Article 型別的屬性鍵
type ArticleKey = keyof Article;

export default defineEventHandler((event): ArticleData => {
  // 獲取查詢參數（query）
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = 10;
  const sortBy = (query.sortBy as ArticleKey) || "id";
  const sortOrder = (query.sortOrder as string) || "desc";
  const tag = query.tag as string;
  const userId = query.userId as string;

  // 根據查詢條件過濾文章
  let filteredArticles = articles.value;
  if (tag) {
    filteredArticles = filteredArticles.filter((article) => article.tags.includes(tag));
  }
  if (userId) {
    filteredArticles = filteredArticles.filter((article) => article.authorId === userId);
  }

  // 根據排序條件對文章進行排序
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    // 獲取文章 a 和 b 在 sortBy 屬性上的值
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    // 如果 valueA 和 valueB 都是 null，則它們相等，返回 0
    if (valueA === null && valueB === null) {
      return 0;
      // 如果 valueA 是 null，而 valueB 不是，則 valueA 應該排在 valueB 之後，返回 1
    } else if (valueA === null) {
      return 1;
      // 如果 valueB 是 null，而 valueA 不是，則 valueB 應該排在 valueA 之後，返回 -1
    } else if (valueB === null) {
      return -1;
    }

    if (sortOrder === "asc") {
      // "asc"（升序）
      return valueA > valueB ? 1 : -1;
    } else {
      // "desc"（降序）
      return valueA < valueB ? 1 : -1;
    }
  });

  // 計算當前頁的起始索引
  const startIndex = (page - 1) * limit;
  // 計算當前頁的結束索引
  const endIndex = page * limit;
  // 使用 slice 方法從排序後的文章中獲取當前頁的文章列表
  const articleList = sortedArticles.slice(startIndex, endIndex);

  // 返回當前頁的文章列表，以及是否還有更多文章
  return {
    articles: articleList,
    hasMore: endIndex < sortedArticles.length,
  };
});
