export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  if (!userStore.isLogin) {
    if (to.path === "/article/create") {
      return navigateTo("/user/login");
    }
  } else {
    if (to.path === "/user/login" || to.path === "/user/register") {
      return navigateTo("/");
    }
  }

  if (to.path.includes("edit") && to.params.id) {
    const responseArticle = await $fetch(`/api/article/getArticle?id=${to.params.id}`);

    if (responseArticle && responseArticle.authorId !== userStore.userInfo.id) {
      return navigateTo(`/article/${to.params.id}`);
    }
  }
});
