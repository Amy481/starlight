<script setup>
  import { toast } from "vue3-toastify";

  const article = ref({
    authorId: "",
    title: "",
    content: "",
    cover: "",
    tags: [],
  });

  const route = useRoute();
  const isEditMode = !!route.params.id;
  const userStore = useUserStore();
  const isValidPictureUrl = ref(true);

  const newTag = ref("");
  articleValidationRules();
  const errorTagMessage = ref("");

  const addTag = (event) => {
    event.preventDefault();
    if (!Array.isArray(article.value.tags)) {
      article.value.tags = [];
    }
    if (article.value.tags.length >= 5) {
      errorTagMessage.value = "只能輸入5個標籤";
      return;
    }
    if (newTag.value.length > 10) {
      errorTagMessage.value = "每個標籤不可以超過 10 個字！";
      return;
    }
    if (newTag.value && !article.value.tags.includes(newTag.value.trim())) {
      article.value.tags.push(newTag.value.trim());
      newTag.value = "";
      errorTagMessage.value = "";
    }
  };

  watch(newTag, (newValue) => {
    if (newValue.length === 0 && errorTagMessage.value) {
      errorTagMessage.value = "";
    }
  });

  const removeTag = (index) => {
    article.value.tags.splice(index, 1);
  };

  const authorId = userStore.userInfo.id;
  const authorName = userStore.userInfo.name;

  const submitArticle = async () => {
    try {
      const response = await $fetch("/api/article/createArticle", {
        method: "POST",
        body: {
          ...article.value,
          authorId,
          authorName,
        },
      });

      if (response.success) {
        article.authorId = "";
        article.title = "";
        article.content = "";
        article.cover = "";
        article.tags = [];

        const useNotification = useNotificationStore();
        if (isEditMode) {
          useNotification.notificationMessage = "成功更新文章！";
        } else {
          useNotification.notificationMessage = "成功新增文章！";
        }
        useNotification.notificationSuccess();
        navigateTo(`/article/${response.article.id}`);
      } else {
        toast.error("新增/編輯文章失敗");
      }
    } catch (error) {
      console.error("新增/編輯文章失敗", error);
    }
  };
</script>

<template>
  <VForm @submit="submitArticle" v-slot="{ meta, errors }">
    <div class="mb-3">
      <label for="title" class="form-label fw-bold fs-3">標題</label>
      <VField
        type="text"
        class="form-control form-control-lg border-3"
        id="title"
        name="title"
        v-model="article.title"
        :class="{ 'is-invalid': errors['title'] }"
        rules="title" />
      <VErrorMessage name="title" class="invalid-feedback" />
    </div>
    <div class="mb-3">
      <label for="cover" class="form-label fw-bold fs-3">文章封面圖</label>
      <VField
        v-model="article.cover"
        type="url"
        name="cover"
        id="cover"
        class="form-control form-control-lg"
        placeholder="請輸入圖片網址" />
      <label for="cover" class="text-muted fs-6 fw-lighter text-end">
        建議尺寸600px*400px，將自動調整為最適大小
      </label>
      <PictureValidator
        :url="article?.cover"
        :width="600"
        :height="400"
        @update:isValid="isValidPictureUrl = $event" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label fw-bold fs-4">內容</label>
      <VField
        as="textarea"
        class="form-control"
        id="content"
        name="content"
        rows="10"
        v-model="article.content"
        :class="{ 'is-invalid': errors['content'] }"
        rules="content" />
      <VErrorMessage name="content" class="invalid-feedback" />
    </div>

    <div class="mb-3">
      <label for="tags" class="form-label fw-bold fs-4">標籤</label>
      <div class="form-control d-flex flex-wrap align-items-center p-1">
        <span
          v-for="(tag, index) in article.tags"
          :key="index"
          class="badge bg-secondary rounded-pill me-2">
          <NuxtLink :to="`/topic/${tag}`" class="tag">{{ tag }}</NuxtLink>
          <i class="bi bi-x-lg" @click="removeTag(index)"></i>
        </span>
        <VField
          id="tags"
          name="tags"
          class="tag-input-text border-0 flex-grow-1"
          placeholder="按Enter送出"
          @keydown.enter="addTag"
          v-model="newTag"
          :class="{ 'is-invalid': errors['tags'] }" />
        <VErrorMessage name="tags" class="invalid-feedback" />
      </div>
      <p v-if="errorTagMessage" class="text-danger">{{ errorTagMessage }}</p>
    </div>
    <button
      type="submit"
      class="btn btn-lg btn-save mb-5"
      :disabled="!isValidPictureUrl || !meta.valid">
      確定儲存
    </button>
  </VForm>
</template>

<style scoped>
  .tag-input-text {
    outline: none;
  }
  .tag {
    color: white;
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
