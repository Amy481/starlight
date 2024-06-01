export const useUserStore = defineStore("user", () => {
  const isLogin = ref(false);
  const userInfo = ref({ id: "", name: "", avatar: "", email: "" });
  const rememberMe = ref(false);
  const rememberMeData = ref({ email: "", password: "" });

  const login = (user: { id: string; name: string; avatar: string; email: string }) => {
    isLogin.value = true;
    userInfo.value = user;
  };

  const logout = () => {
    isLogin.value = false;
    userInfo.value = { id: "", name: "", avatar: "", email: "" };
    rememberMe.value = false;
  };
  return {
    isLogin,
    userInfo,
    rememberMe,
    rememberMeData,
    login,
    logout,
  };
});
