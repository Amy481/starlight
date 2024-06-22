<script lang="ts" setup>
  import { toast } from "vue3-toastify";
  const route = useRoute();
  const articleId = route.params.id;
  const { data: article, error } = await useFetch(`/api/article/getArticle?id=${articleId}`);
  if (!article.value) {
    throw showError({ statusCode: 404 });
  }

  useSeoMeta({
    title: article.value ? `${sliceContent(article.value.title, 30)}` : "載入中…",
    ogTitle: article.value ? `${sliceContent(article.value.title, 30)} - 文章詳情` : "載入中…",
    description: article.value ? sliceContent(article.value.content, 100) : "載入中…",
    ogDescription: article.value ? sliceContent(article.value.content, 100) : "載入中…",
    ogImage: article.value?.cover ?? "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });

  const useNotification = useNotificationStore();
  if (useNotification.isNotification) {
    useNotification.notificationFail();
    toast.success(useNotification.notificationMessage);
  }

  const isArticleAuthor = ref(false);
  const useUser = useUserStore();

  if (article.value?.authorId === useUser.userInfo.id) {
    isArticleAuthor.value = true;
  } else {
    isArticleAuthor.value = false;
  }

  const deleteArticle = async () => {
    try {
      const response = await $fetch(`/api/article/deleteArticle?id=${route.params.id}`, {
        method: "DELETE",
      });
      if (response.success) {
        const useNotification = useNotificationStore();
        useNotification.notificationMessage = response.message;
        useNotification.notificationSuccess();
        navigateTo("/article/list");
      } else {
        console.error("刪除文章失敗");
      }
    } catch (error) {
      console.error("刪除文章錯誤:", error);
    }
  };

  const userStore = useUserStore();
  const isLiked = ref(false);
  if (article.value) {
    isLiked.value = article.value.likedByUsers.some((user) => user.id === userStore.userInfo.id);
  }

  const likeArticle = async () => {
    if (!userStore.isLogin) {
      return;
    }
    const { success, likedByUsers } = await $fetch("/api/article/likeArticle", {
      method: "POST",
      body: {
        id: articleId,
        userId: userStore.userInfo.id,
      },
    });
    if (success && likedByUsers) {
      isLiked.value = likedByUsers.some((user) => user.id === useUser.userInfo.id);
    }
  };
</script>

<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-lg-11 col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <NuxtLink to="/article/list" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i> 返回列表頁
          </NuxtLink>
          <div v-if="isArticleAuthor">
            <NuxtLink :to="`/article/${route.params.id}/edit`" class="btn btn-edit me-2">
              <i class="bi bi-pencil-square"></i> 編輯
            </NuxtLink>
            <button class="btn btn-outline-danger me-2" @click="deleteArticle">
              <i class="bi bi-trash"></i> 刪除
            </button>
          </div>
        </div>
        <article>
          <header class="mb-4">
            <h1 class="article-title mb-3 display-4 fw-bold">{{ article?.title }}</h1>
            <div
              class="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3">
              <div class="text-muted fst-italic me-3">
                <i class="bi bi-calendar-event me-1"></i>
                {{ article?.date }}
              </div>
              <NuxtLink :to="`/user/${article?.authorId}`" class="text-muted fst-italic">
                <i class="bi bi-person-fill me-1"></i>
                {{ article?.authorName }}
              </NuxtLink>
              <div class="ms-auto fs-4">
                <i
                  :class="['bi', isLiked ? 'bi-heart-fill text-danger' : 'bi-heart']"
                  @click="likeArticle"></i>
                {{ article?.likes }}
              </div>
            </div>
            <div class="mb-3">
              <NuxtLink
                v-for="tag in article?.tags"
                :key="tag.name"
                class="badge bg-secondary text-decoration-none link-light me-2 mb-2"
                :to="'/topic/' + tag.name">
                <i class="bi bi-tag-fill me-1"></i>
                {{ tag.name }}
              </NuxtLink>
            </div>
          </header>
          <figure v-if="article?.cover != null" class="article-cover mb-4 text-center">
            <NuxtImg
              :src="article?.cover"
              class="img-fluid rounded mx-auto"
              :alt="article?.title"
              quality="90"
              format="webp"
              loading="lazy" />
          </figure>
          <section class="mb-5">
            <p class="fs-5 mb-4 text-break">
              {{ article?.content }}
            </p>
          </section>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .btn-edit {
    border-color: darkmagenta;
    color: darkmagenta;
  }
  .btn-edit:hover {
    background-color: darkmagenta;
    color: whitesmoke;
  }

  .article-title {
    color: darkblue;
    word-break: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  .article-cover {
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
    overflow: hidden;
  }

  .article-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .comments-list .comment-item {
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 1rem;
  }

  .comments-list .nested-comments {
    border-left: 2px solid #dee2e6;
    padding-left: 1rem;
  }
</style>
