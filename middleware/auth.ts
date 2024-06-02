export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const useNotification = useNotificationStore();
  if (!userStore.isLogin) {
    if (to.path === "/article/create" || to.path.match(/^\/article\/\d+\/edit$/)) {
      useNotification.notificationMessage = "請先登入帳號！";
      useNotification.notificationSuccess();
      return navigateTo("/user/login");
    }
  } else {
    if (to.path === "/user/login" || to.path === "/user/register") {
      return navigateTo("/");
    }
  }

  if (to.path.includes("edit") && to.params.id) {
    const { data: responseArticle } = await useFetch(`/api/article/getArticle?id=${to.params.id}`);

    if (responseArticle.value && responseArticle.value.authorId !== userStore.userInfo.id) {
      useNotification.notificationMessage = "請先登入帳號！";
      useNotification.notificationSuccess();
      return navigateTo(`/article/${to.params.id}`);
    }
  }
});
