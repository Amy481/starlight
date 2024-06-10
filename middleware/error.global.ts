export default defineNuxtRouteMiddleware((to, from) => {
  const error = useError();
  // 監聽所有404錯誤
  if (error.value?.statusCode === 404) {
    error.value.message = "您正在搜尋的頁面不存在！";
  }
});
