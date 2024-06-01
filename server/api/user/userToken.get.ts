import jwt from "jsonwebtoken";
import { users } from "./../user";
import { getCookie } from "h3";

export default defineEventHandler(async (event) => {
  // 獲取 cookie 中的 token
  const token = getCookie(event, "access_token");
  if (!token) {
    return {
      code: 400,
      success: false,
      message: "未登入",
    };
  }

  const config = useRuntimeConfig();
  const secretKey = config.jwtSignSecret;

  try {
    // 驗證 token 有效性，並轉換為 userId
    const decoded = jwt.verify(token, secretKey) as { userId: string };

    // 尋找對應用户信息
    const user = users.value.find((user) => user?.id === decoded.userId);

    if (!user) {
      return {
        code: 404,
        success: false,
        message: "用戶不存在",
      };
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    };
    return {
      code: 200,
      success: true,
      data: userInfo,
    };
  } catch (error) {
    return {
      code: 401,
      success: false,
      message: "無效的 token",
    };
  }
});
