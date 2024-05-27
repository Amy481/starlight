// 函數用於裁剪內容到指定的字符數量並添加省略號
export const sliceContent = (content: string, limit: number) => {
  return content.length > limit ? content.substring(0, limit) + "..." : content;
};

// 函數用於格式化數字，如果數字大於999則顯示 '999+'
export const formatCount = (count: number) => {
  return count > 999 ? "999+" : count.toString();
};
