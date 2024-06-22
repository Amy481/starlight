import prisma from "@/server/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 檢查電子郵件是否存在於用戶列表中
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    return {
      success: false,
      code: 404,
      message: "帳號不存在",
    };
  }

  // 使用 bcrypt 比對請求的密碼與資料庫中儲存的雜湊密碼
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      code: 401,
      message: "密碼不正確",
    };
  }

  const userInfo = {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
  };

  const config = useRuntimeConfig();
  const secretKey = config.jwtSignSecret;
  // 使用 JWT 簽證用戶 ID，生成有效期為 7 天的 token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "7d" });
  // 設置包含 token 的 cookie
  setCookie(event, "access_token", token, {
    maxAge: 60 * 60 * 24 * 7, // cookie 的有效期為 7 天
    path: "/", // "/" 表示對整個網站都有效
    sameSite: "lax", // 允許某些跨站點的請求包含 cookie
    httpOnly: true, // 設置 httpOnly 標誌，防止客戶端 JavaScript 訪問 cookie
    secure: true, // 僅允許通過 HTTPS 傳輸 cookie
  });

  // 登入成功後，返回成功訊息和用戶資訊
  return {
    success: true,
    code: 200,
    message: "登入成功",
    data: userInfo,
  };
});
