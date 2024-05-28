import { defineEventHandler, getQuery } from "h3";
import https from "https";

// API 回傳表示圖片是否有效
interface PictureCheckResponse {
  valid: boolean;
}

export default defineEventHandler(async (event): Promise<PictureCheckResponse> => {
  const query = getQuery(event);
  const url = query.url as string;

  // 返回一個 Promise，異步驗證圖片有效性
  return new Promise((resolve) => {
    // 使用 https 模組發送 HEAD 請求到圖片的 URL
    const req = https.request(url, { method: "HEAD" }, (response) => {
      // 獲取響應頭中的 Content-Type
      const contentType = response.headers["content-type"];
      // 如果 Content-Type 存在並且以 "image/" 開頭，說明是有效的圖片
      if (contentType && contentType.startsWith("image/")) {
        resolve({ valid: true });
      } else {
        resolve({ valid: false });
      }
    });

    req.on("error", () => {
      resolve({ valid: false });
    });

    req.end();
  });
});
