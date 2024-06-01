import CryptoJS from "crypto-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const secretKey = config.rememberMeEncryptionKey;

  const { data } = await readBody(event);

  // 加密函數
  const encrypt = (data: string, secretKey: string): string => {
    // 將密鑰轉換為 CryptoJS 所需的格式
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    // 取密鑰的前 16 個字符作為初始化向量（IV）
    const iv = CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16));
    // 使用 AES 算法加密數據，並將結果轉換為字符串
    return CryptoJS.AES.encrypt(data, key, { iv }).toString();
  };

  // 調用加密函數加密數據
  const encryptedData = encrypt(data, secretKey);
  return { encryptedData };
});
