<script setup>
  useSeoMeta({
    title: `編輯文章 - Starlight 星光平台`,
    ogTitle: `編輯文章 - 文章管理`,
    description: `編輯標題、內容、封面圖片及標籤，完善您的創作以增強讀者體驗。`,
    ogDescription: `在 Starlight 星光平台編輯文章。進行必要的修改以確保文章質量和資訊的準確性，提升閱讀者的互動和參與。`,
    ogImage: "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });
  definePageMeta({
    middleware: "auth",
  });
</script>

<template>
  <div class="container mt-4">
    <h1>編輯文章</h1>
    <hr />
    <ArticleForm />
  </div>
</template>

<style scoped>
  .upload {
    height: 150px;
    width: 250px;
    background-color: #f8f9fa;
    color: darkblue;
    cursor: pointer;
  }
  .upload-image {
    cursor: pointer;
  }

  .btn-save {
    border-color: darkblue;
    color: darkblue;
    background-color: white;
  }

  .btn-save:hover {
    color: white;
    background-color: darkblue;
  }
</style>
