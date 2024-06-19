// API 回傳表示圖片是否有效
interface PictureCheckResponse {
  valid: boolean;
}

export default defineEventHandler(async (event): Promise<PictureCheckResponse> => {
  const query = getQuery(event);
  const url = query.url as string;

  // 驗證 URL 是否有效
  try {
    new URL(url);
  } catch (error) {
    return { valid: false };
  }

  try {
    // 使用 fetch API 發送 HEAD 請求到圖片的 URL
    const response = await fetch(url, { method: "HEAD" });

    // 如果響應狀態碼在 200-299 範圍內,說明圖片有效
    return { valid: response.ok };
  } catch (error) {
    return { valid: false };
  }
});
