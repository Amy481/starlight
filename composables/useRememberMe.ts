export const useRememberMe = () => {
  const userStore = useUserStore();
  // 對登入資訊進行加密
  const setRememberMe = async (credentials: { email: string; password: string }) => {
    const { encryptedData } = await $fetch("/api/user/encrypt", {
      method: "POST",
      body: { data: JSON.stringify(credentials) },
    });
    // 啟用 記住我 功能
    userStore.rememberMe = true;

    // 將加密後的登入資訊存儲到 localStorage 中
    localStorage.setItem("rememberMe", encryptedData);
  };

  const getRememberMe = async () => {
    if (userStore.rememberMeData.email && userStore.rememberMeData.password) {
      return userStore.rememberMeData;
    }
    // 從 localStorage 中獲取加密的登入資訊
    const encryptedData = localStorage.getItem("rememberMe");

    // 將加密的登入資訊解密
    if (encryptedData) {
      const { decryptedData } = await $fetch("/api/user/decrypt", {
        method: "POST",
        body: { encryptedData },
      });
      // 檢查解密後的資料是否為有效的 JSON 格式，如果是則將其解析為物件並返回
      if (isValidJSON(decryptedData)) {
        userStore.rememberMeData = JSON.parse(decryptedData);
        return JSON.parse(decryptedData);
      }
      // 如果解密後的資料不是有效的 JSON 格式，從 localStorage 中移除 "rememberMe"
      localStorage.removeItem("rememberMe");
    }

    return null;
  };
  //檢查字串是否為有效的 JSON 格式
  const isValidJSON = (str: string) => {
    try {
      // 將字串解析為 JSON 物件
      JSON.parse(str);
      return true;
    } catch {
      // 如果解析失敗（拋出異常），返回 false
      return false;
    }
  };

  return { setRememberMe, getRememberMe };
};
