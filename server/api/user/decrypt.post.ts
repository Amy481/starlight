import CryptoJS from "crypto-js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const secretKey = config.rememberMeEncryptionKey;

  const { encryptedData } = await readBody(event);

  // 解密函數
  const decrypt = (ciphertext: string, secretKey: string): string => {
    // 將密鑰轉換為 CryptoJS 所需的格式
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    // 取密鑰的前 16 個字符作為初始化向量（IV）
    const iv = CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16));
    // 使用 AES 算法解密數據，並將結果轉換為 UTF-8 編碼的字符串
    return CryptoJS.AES.decrypt(ciphertext, key, { iv }).toString(CryptoJS.enc.Utf8);
  };

  // 調用解密函數解密數據
  const decryptedData = decrypt(encryptedData, secretKey);
  return { decryptedData };
});
