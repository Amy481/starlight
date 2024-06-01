export const setRememberMe = async (credentials: { email: string; password: string }) => {
  // 對登入資訊進行加密
  const { encryptedData } = await $fetch("/api/user/encrypt", {
    method: "POST",
    body: { data: JSON.stringify(credentials) },
  });

  const userStore = useUserStore();

  // 啟用 記住我 功能
  userStore.rememberMe = true;

  // 將加密後的登入資訊存儲到 localStorage 中
  localStorage.setItem("rememberMe", encryptedData);
};

export const getRememberMe = async (): Promise<{ email: string; password: string } | null> => {
  const userStore = useUserStore();
  if (userStore.rememberMeData.email && userStore.rememberMeData.password) {
    return userStore.rememberMeData;
  }
  // 從 localStorage 中獲取加密的登入資訊
  const encryptedData = localStorage.getItem("rememberMe");

  if (encryptedData) {
    // 將加密的登入資訊進行解密
    const { decryptedData } = await $fetch("/api/user/decrypt", {
      method: "POST",
      body: { encryptedData },
    });

    // 檢查解密後的資料是否為有效的 JSON 格式
    if (isValidJSON(decryptedData)) {
      userStore.rememberMeData = JSON.parse(decryptedData);
      // 如果是有效的 JSON 格式，將其解析為物件並返回
      return JSON.parse(decryptedData);
    }

    // 如果解密後的資料不是有效的 JSON 格式，從 localStorage 中移除 "rememberMe" 鍵
    localStorage.removeItem("rememberMe");
  }
  return null;
};

//檢查字串是否為有效的 JSON 格式
const isValidJSON = (str: string): boolean => {
  try {
    // 將字串解析為 JSON 物件
    JSON.parse(str);
    return true;
  } catch {
    // 如果解析失敗（拋出異常），返回 false
    return false;
  }
};
