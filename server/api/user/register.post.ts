import { User } from "@/types";
import { users } from "./../user";
import bcrypt from "bcrypt";
import { uuidv7 as uuid } from "uuidv7";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 檢查email是否已經被註冊
  const existingUser = users.value.find((user) => user?.email === body.email);
  if (existingUser) {
    return {
      success: false,
      code: 409,
      message: "信箱與已有帳號重複",
    };
  }

  // 生成新用戶 ID
  const newUserId = uuid();

  // 加密密碼
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  // 如果 avatar 為空，則使用特定圖片
  if (!body.avatar) {
    body.avatar = "/default_avatar.jpg";
  }

  // 創建新用戶對象
  const newUser: User = {
    id: newUserId,
    name: body.name,
    avatar: body.avatar,
    email: body.email,
    password: hashedPassword,
    emailVerified: false, // 預設為未驗證
  };

  // 將新用戶添加到 users 數組
  users.value.push(newUser);

  return {
    success: true,
    code: 201,
    message: "註冊成功",
  };
});
