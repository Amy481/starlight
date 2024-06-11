<script setup lang="ts">
  import type { Article } from "~/types";

  const props = defineProps<{
    article: Article;
  }>();
</script>

<template>
  <div class="card border-1 mt-3 shadow">
    <div class="card-body">
      <NuxtLink :to="'/article/' + article.id">
        <h3 class="article-title text-wrap">
          {{ article.title }}
        </h3>
      </NuxtLink>
      <div class="mb-1 text-muted small">
        <span>
          <NuxtLink :to="`/user/${article.authorId}`">{{ article.authorName }}</NuxtLink>
        </span>
        <span class="ms-2">
          {{ article.date }}
        </span>
      </div>
      <NuxtLink :to="'/article/' + article.id" class="text-dark">{{
        sliceContent(article.content, 200)
      }}</NuxtLink>

      <div class="d-flex justify-content-md-between flex-lg-row flex-column mt-2">
        <div>
          <NuxtLink
            v-for="tag in article.tags"
            :key="tag"
            class="badge bg-secondary me-1"
            :to="'/topic/' + tag"
            ># {{ tag }}</NuxtLink
          >
        </div>
        <p class="text-muted small text-end p-0 m-0">
          <span class="mx-1"><i class="bi bi-heart me-1"></i>{{ formatCount(article.likes) }}</span>
          <span class="mx-1"><i class="bi bi-eye me-1"></i> {{ formatCount(article.views) }} </span>
        </p>
      </div>
    </div>
    <div class="card-footer text-muted border-0">
      <NuxtLink class="btn btn-outline-dark py-0 m-1 border-0" :to="'/article/' + article.id"
        >查看更多<i class="bi bi-caret-right-fill ms-1"></i
      ></NuxtLink>
    </div>
  </div>
</template>

<style scoped>
  .card {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    background-clip: padding-box;
  }

  .card:hover {
    transform: scale(1.02);
    border-image: linear-gradient(to right, rgb(128, 128, 0), rgb(255, 255, 0)) 1;
  }

  .article-title {
    color: darkblue;
  }
</style>
