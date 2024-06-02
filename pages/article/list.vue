<script lang="ts" setup>
  useSeoMeta({
    title: "熱門創作 - 探索最受歡迎的文章",
    ogTitle: "熱門創作 - Starlight 星光平台",
    description:
      "瀏覽我們的熱門創作列表，找到符合你喜好的高質量文章。深入瞭解各種話題，激發你的創意靈感。",
    ogDescription:
      "在 Starlight 星光平台探索熱門創作，發現最佳和最受歡迎的文章，涵蓋各式主題。加入我們，與創作者社群互動。",
    ogImage: "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });

  const userStore = useUserStore();
  const { isLogin } = storeToRefs(userStore);
</script>

<template>
  <BackgroundSection>
    <h1 class="m-0">熱門創作</h1>
  </BackgroundSection>
  <section class="hr-background p-2"></section>
  <div class="row flex-row-reverse p-0 m-0">
    <div class="col-md-3 d-none d-md-block">
      <UserProfile v-if="isLogin" />
      <div class="my-2">
        <div class="row">
          <div class="col-12">
            <client-only>
              <NuxtLink
                v-if="!isLogin"
                class="btn btn-lg btn-block btn-outline-warning w-100"
                to="/article/create">
                <i class="bi bi-plus-lg me-1"></i>發表我的創作
              </NuxtLink>
            </client-only>
          </div>
        </div>
      </div>
      <ArticleTopics />
    </div>
    <div class="col-md-9 col-12 mb-5">
      <ArticleList />
    </div>
  </div>
</template>

<style scoped>
  .hr-background {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgb(255, 255, 255) 100%);
  }
</style>
