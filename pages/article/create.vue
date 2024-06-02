<script setup>
  useSeoMeta({
    title: "新增文章 - Starlight 星光平台",
    ogTitle: "發表新文章 - 加入我們的創作社群",
    description: "使用 Starlight 發表您的文章，輕鬆分享您的創意與想法。",
    ogDescription:
      "在 Starlight 星光平台發表您的創意文章，並與全球創作者社群互動。分享您的知識和創意，激發更多靈感。",
    ogImage: "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });
  definePageMeta({
    middleware: "auth",
  });
</script>

<template>
  <div class="container mt-4">
    <h1>新增文章</h1>
    <hr />
    <ArticleForm />
  </div>
</template>
