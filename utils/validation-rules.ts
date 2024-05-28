import { defineRule } from "vee-validate";

export function registerValidationRules() {
  defineRule("email", (value: string) => {
    if (!value) {
      return "email不可以為空喔！";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "請輸入有效的email！";
    }
    return true;
  });

  defineRule("password", (value: string) => {
    if (!value) {
      return "密碼不可以為空喔！";
    }
    if (value.length < 8 || value.length > 20) {
      return "密碼長度必須介於8至20個字數之間！";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/.test(value)) {
      return "密碼必須包含一個大寫字母、一個小寫字母、一個數字！";
    }
    return true;
  });

  defineRule("name", (value: string) => {
    if (!value) {
      return "用戶名稱不可以為空喔！";
    }
    if (value.length > 20) {
      return "用戶名稱不可以大於20個字！";
    }
    return true;
  });
}
