import { articles } from "../articles";

export default defineEventHandler((event) => {
  const articleList = articles.value;

  return {
    articles: articleList,
  };
});
