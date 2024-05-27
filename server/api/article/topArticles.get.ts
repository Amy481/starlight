import { Article } from "~/types";
import { articles } from "../articles";

export default defineEventHandler(async () => {
  function getTopArticles(): Article[] {
    const sortedArticles = [...articles.value].sort((a, b) => b.likes - a.likes);
    return sortedArticles.slice(0, 5);
  }
  const topArticles = getTopArticles();

  return {
    topArticles,
  };
});
