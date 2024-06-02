<script lang="ts" setup>
  const route = useRoute();
  const tag = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

  useSeoMeta({
    title: `#${tag} - 探索主題創作`,
    ogTitle: `探索 #${tag} 的所有文章 - Starlight 星光平台`,
    description: `探索與 #${tag} 相關的創作。Starlight 為你匯聚多樣化的內容，涵蓋廣泛主題，鼓勵深入交流與討論。加入我們，與同好一起分享見解，擴展視野。`,
    ogDescription: `查看使用 #${tag} 標籤的所有文章，探索與此主題相關的豐富內容和創意。加入討論並分享你的觀點。`,
    ogImage: `/starlight-background.jpg`,
    twitterCard: "summary_large_image",
  });
</script>

<template>
  <BackgroundSection>
    <h1 class="m-0"># {{ tag }}</h1>
  </BackgroundSection>
  <section class="hr-background p-2"></section>
  <div class="container d-flex justify-content-center">
    <div class="col-11 mb-5">
      <ArticleList :tag="tag" />
    </div>
  </div>
</template>

<style scoped></style>
