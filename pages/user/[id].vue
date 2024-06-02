<script lang="ts" setup>
  import type { User } from "~/types";

  const route = useRoute();
  const authorId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const author = ref<User | null>(null);
  onMounted(async () => {
    author.value = await $fetch(`/api/user/${authorId}`);
  });

  useSeoMeta({
    title: `${author.value?.name}的創作`,
    ogTitle: `探索 ${author.value?.name} 的創作集`,
    description: `發掘 ${author.value?.name} 在 Starlight 的精彩創作內容。了解作者如何將創意轉化為文字，並共享創作的樂趣。`,
    ogDescription: `探索 ${author.value?.name} 的精彩文章集，每一篇文章都是對創意和表達的探索，在這裡發現、互動並豐富您的閱讀生活。`,
    ogImage: author.value?.avatar,
    twitterCard: "summary_large_image",
  });
</script>

<template>
  <BackgroundSection>
    <h1 class="m-0">{{ author?.name }}的創作</h1>
  </BackgroundSection>
  <section class="hr-background p-2"></section>
  <div class="row flex-row-reverse p-0 m-0">
    <div class="col-md-3 d-none d-md-block">
      <UserProfile :userId="authorId" />
      <div class="my-2">
        <div class="row">
          <div class="col-12">
            <NuxtLink class="btn btn-lg btn-block btn-outline-warning w-100" to="/article/create">
              <i class="bi bi-plus-lg me-1"></i>發表我的創作
            </NuxtLink>
          </div>
        </div>
      </div>
      <ArticleTopics :userId="authorId" />
    </div>
    <div class="col-md-9 col-12 mb-5">
      <ArticleList :userId="authorId" />
    </div>
  </div>
</template>

<style scoped>
  .hr-background {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgb(255, 255, 255) 100%);
  }
</style>
