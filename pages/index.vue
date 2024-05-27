<script lang="ts" setup>
  useSeoMeta({
    title: "Starlight 星光 - 讓你的創作雲遊星海",
    ogTitle: "Starlight 星光 - 發現和分享創意",
    description:
      "Starlight 星光是一個創意平台，讓你自由發表文章，探索熱門標籤，並與其他創作者交流。加入我們，讓你的創意無限擴展！",
    ogDescription:
      "加入 Starlight 星光，發現最熱門的文章和標籤，分享你的創作，並與全球創作者交流。讓你的創意閃耀如星光。",
    ogImage: "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });

  const { data: topArticleData } = await useFetch("/api/article/topArticles");
  const { data: topTagsData } = await useFetch("/api/tag/topTags");
  const activeTopics = topTagsData.value?.topTags || [];
  const activeArticles = topArticleData.value?.topArticles || [];
  const topArticles = ref(
    activeArticles.slice(0, 3).map((article) => ({
      ...article,
      showContent: false,
    }))
  );

  const showContent = (article: { showContent: boolean }) => {
    article.showContent = true;
  };

  const hideContent = (article: { showContent: boolean }) => {
    article.showContent = false;
  };
</script>
<template>
  <BackgroundSection>
    <h1 class="mt-md-5 mb-4 display-3 fw-bolder">Starlight 星光</h1>
    <p class="blockquote-footer ms-2">
      <cite class="mb-4 text-white fs-4">讓你的創作雲遊星海</cite>
    </p>
    <NuxtLink class="btn mb-5 glow-button" to="/article/list"
      >開始創作
      <i class="bi bi-arrow-right"></i>
    </NuxtLink>
  </BackgroundSection>
  <section class="featured-creations-section p-4">
    <div class="divider my-4">
      <h3 class="featured-creations mx-5">熱門標籤</h3>
    </div>
    <nav class="p-3 mb-4">
      <NuxtLink
        v-for="topic in activeTopics"
        :key="topic.tag"
        :to="`/topic/${topic.tag}`"
        class="badge rounded-pill flex-wrap m-1"
        ># {{ topic.tag }}</NuxtLink
      >
    </nav>
    <div class="divider my-4">
      <h3 class="featured-creations mx-5">熱門作品</h3>
    </div>
    <nav class="row">
      <article v-for="article in topArticles" :key="article.id" class="col-lg-4 col-12 mb-4">
        <NuxtLink
          class="card article-card"
          :to="`/article/${article.id}`"
          @mouseover="showContent(article)"
          @mouseleave="hideContent(article)">
          <NuxtImg
            v-if="!article.cover"
            src="/no-image-available.jpg"
            class="card-img-top"
            :alt="article.title"
            format="webp"
            loading="lazy" />
          <NuxtImg
            v-if="article.cover"
            :src="article.cover"
            class="card-img-top"
            :alt="article.title"
            format="webp"
            loading="lazy" />
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
          </div>
          <div class="article-text p-2" :class="{ 'show-content': article.showContent }">
            <p class="card-text text-wrap">
              <i class="bi bi-quote me-2"></i>
              {{ sliceContent(article.content, 150) }}<i class="bi bi-quote quote-left"></i>
            </p>
          </div>
        </NuxtLink>
      </article>
    </nav>
  </section>

  <section class="guide-section">
    <figure class="d-flex justify-content-center align-items-center">
      <NuxtImg
        preload
        src="/starlight-guide.jpg"
        class="guide-image"
        alt="Guide"
        fit="inside"
        sizes="sm:160 md:384 lg:512 xl:640 xxl:768"
        format="webp"
        quality="100" />
    </figure>
    <div class="p-5">
      <article
        class="container d-flex flex-column align-items-center col-lg-6 col-md-8 col-12 bg-white p-3 border-white border-5 rounded-3 opacity-75">
        <h2 class="mb-4">
          <i class="bi bi-stars text-warning"></i>
          引路指南
          <i class="bi bi-stars text-warning"></i>
        </h2>
        <h4>請參考以下步驟開始你在星光的創作：</h4>
        <ul class="list-unstyled text-start mt-3">
          <li>
            <strong class="text-secondary me-1"><i class="bi bi-1-square-fill"></i></strong
            >註冊/登入帳戶，開啟您的創作之旅
          </li>
          <li>
            <strong class="text-secondary me-1"><i class="bi bi-2-square-fill"></i></strong
            >使用「新增發布」按鈕發布您的第一篇作品
          </li>
          <li>
            <strong class="text-secondary me-1"><i class="bi bi-3-square-fill"></i></strong
            >探索其他創作者的作品，啟發靈感
          </li>
          <li>
            <strong class="text-secondary me-1"><i class="bi bi-4-square-fill"></i></strong
            >參與社群，分享和討論你的想法
          </li>
        </ul>
        <footer class="fs-6 fw-bolder">
          <p><i>如果有任何問題，請透過頁尾資訊聯絡</i></p>
        </footer>
      </article>
    </div>
  </section>
</template>
<style scoped>
  .glow-button {
    background-color: whitesmoke;
    box-shadow: 0 0 8px 2px transparent;
    border: 2px solid transparent;
  }
  .glow-button:hover {
    background-color: white;
    color: black;
    box-shadow: 0 0 8px 2px white;
    border: 2px solid white;
  }

  .featured-creations-section {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgb(25, 10, 10) 100%);
  }
  .featured-creations {
    color: white;
    text-shadow: 2px 2px 4px rgba(25, 10, 10, 0.7);
  }
  .guide-section {
    position: relative;
    background: linear-gradient(to bottom, rgb(25, 10, 10) 0%, rgba(208, 143, 133, 0.5) 50%);
  }
  .guide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .badge {
    color: azure;
    border: 2px solid transparent;
  }
  .badge:hover {
    color: gold;
    border: 2px solid gold;
  }

  .article-card {
    overflow: hidden;
    background-color: transparent;
    border-bottom-color: aliceblue;
  }

  .card-img-top {
    object-fit: cover;
    height: 30vh;
  }

  .card-title {
    color: whitesmoke;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .article-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
  }

  .quote-left::before {
    transform: rotate(180deg);
  }

  .show-content {
    transform: translateY(0);
  }
</style>
