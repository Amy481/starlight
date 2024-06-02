<script setup lang="ts">
  import type { Article, ArticleData } from "~/types";

  const articles = ref<Article[]>([]);
  const hasMore = ref(true);
  const sortBy = ref("");
  const sortOrder = ref("");
  const isLoading = ref(false);
  const page = ref(1);

  // 查詢字符串
  const query = computed(
    () =>
      `/api/article/getFilteredArticles?page=${page.value}&sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`
  );

  const route = useRoute();
  const router = useRouter();
  // updateQuery 函數，用於更新路由查詢參數
  const updateQuery = (newQuery: Record<string, string>) => {
    router.push({ query: { ...route.query, ...newQuery } });
  };

  // 獲取初始文章數據
  const { data: initialArticleData } = await useFetch<ArticleData>(query.value);
  if (initialArticleData.value) {
    // 如果成功獲取初始文章數據，更新文章列表和 hasMore 狀態
    articles.value = initialArticleData.value.articles;
    hasMore.value = initialArticleData.value.hasMore;
  }

  // 獲取指定頁碼和排序條件的文章列表
  const fetchArticles = async (pageNum: number) => {
    isLoading.value = true;
    try {
      // 獲取新的文章數據
      const newArticleData = await $fetch<ArticleData>(query.value);
      if (newArticleData) {
        if (pageNum === 1) {
          // 如果是第一頁，直接更新文章列表
          articles.value = newArticleData.articles;
        } else {
          // 如果不是第一頁，將新的文章數據追加到現有文章列表中
          articles.value = [...articles.value, ...newArticleData.articles];
        }
        hasMore.value = newArticleData.hasMore;
      }
    } finally {
      isLoading.value = false;
    }
  };

  // sortArticles 函數，根據選擇的排序條件獲取文章列表
  const sortArticles = async () => {
    if (sortBy.value && sortOrder.value) {
      page.value = 1;
      // 更新路由查詢參數
      updateQuery({
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
      });
      // 獲取第一頁的文章列表，根據選擇的排序條件
      await fetchArticles(page.value);
    }
  };

  // handleScroll 函數，處理滾動事件
  const handleScroll = async () => {
    // 獲取文檔的總高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 獲取當前滾動位置
    const scrollPosition = window.scrollY + window.innerHeight;

    // 如果滾動到底部，加載更多文章
    if (scrollPosition + 1 >= scrollHeight) {
      page.value++;
      // 獲取下一頁的文章列表，根據當前的排序條件
      await fetchArticles(page.value);
    }
  };

  // 在組件掛載後，添加滾動事件監聽器
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  // 在組件卸載前，移除滾動事件監聽器
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
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
      <div class="card-body">
        <h3 class="article-title text-wrap">
          {{ sliceContent(article.title, 50) }}
        </h3>
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
            <span class="mx-1"
              ><i class="bi bi-heart me-1"></i>{{ formatCount(article.likes) }}</span
            >
            <span class="mx-1"
              ><i class="bi bi-eye me-1"></i> {{ formatCount(article.views) }}
            </span>
          </p>
        </div>
      </div>
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
