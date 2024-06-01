<script setup lang="ts">
  import type { Article } from "~/types";

  const articles = ref<Article[]>([]);
  const hasMore = ref(true);
  const sortBy = ref("");
  const sortOrder = ref("");
  const isLoading = ref(false);

  const fetchArticles = async () => {
    isLoading.value = true;
    try {
      const response = await $fetch("/api/article/getFilteredArticles", {
        method: "GET",
        query: {
          sortBy: sortBy.value,
          sortOrder: sortOrder.value,
        },
      });
      articles.value = response.articles;
    } catch (error) {
      console.error("獲取文章列表失敗：", error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchArticles();
  });

  const sortArticles = async () => {
    fetchArticles();
  };
</script>

<template>
  <div class="row mt-1 d-flex align-items-center">
    <div class="col-4">
      <select v-model="sortBy" id="sortBy" class="form-select">
        <option value="">請選擇排序條件</option>
        <option value="id">文章id</option>
        <option value="likes">喜歡數</option>
        <option value="replies">評論數</option>
        <option value="views">觀看數</option>
        <option value="date">發布時間</option>
      </select>
    </div>
    <div class="col-4">
      <select v-model="sortOrder" id="sortOrder" class="form-select">
        <option value="">請選擇排序方式</option>
        <option value="asc">從小至大</option>
        <option value="desc">從大至小</option>
      </select>
    </div>
    <div class="col-4">
      <button type="button" class="btn btn-outline-secondary" @click="sortArticles()">
        <i class="bi bi-search me-2"></i>確定排序條件
      </button>
    </div>
  </div>
  <div v-if="articles.length === 0 && !isLoading" class="text-center my-5">
    <h4 class="text-muted">暫時還沒有任何文章</h4>
  </div>
  <div v-else>
    <div v-for="(article, index) in articles" :key="index" class="card border-1 mt-3 shadow">
      <NuxtLink :to="'/article/' + article.id" class="card-body">
        <h3 class="article-title text-wrap">
          {{ sliceContent(article.title, 50) }}
        </h3>
        <p :to="'/article/' + article.id" class="mb-1 text-muted small">
          <span>
            <NuxtLink :to="`/user/${article.authorId}`">{{ article.authorName }}</NuxtLink>
          </span>
          <span class="ms-2">
            {{ article.date }}
          </span>
        </p>
        <p class="text-dark">{{ sliceContent(article.content, 200) }}</p>

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
            <span class="mx-1"
              ><i class="bi bi-heart me-1"></i>{{ formatCount(article.likes) }}</span
            >
            <span class="mx-1"
              ><i class="bi bi-eye me-1"></i> {{ formatCount(article.views) }}
            </span>
          </p>
        </div>
      </NuxtLink>
      <div class="card-footer text-muted border-0">
        <NuxtLink class="btn btn-outline-dark py-0 m-1 border-0" :to="'/article/' + article.id"
          >查看更多<i class="bi bi-caret-right-fill ms-1"></i
        ></NuxtLink>
      </div>
    </div>
    <div class="text-center mt-3">
      <p v-if="isLoading" class="text-muted">正在載入文章...</p>
      <p v-else-if="!hasMore && articles.length > 0" class="text-muted">已經載入全部文章</p>
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
