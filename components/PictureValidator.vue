<script lang="ts" setup>
  const props = defineProps<{
    url: string;
    width: number;
    height: number;
  }>();

  const isValidPictureUrl = ref(true);
  const isLoading = ref(false);

  const checkPictureUrl = async () => {
    isLoading.value = true;
    isValidPictureUrl.value = true;
    if (!props.url) {
      isValidPictureUrl.value = false;
      isLoading.value = false;
      return;
    }
    try {
      const response = await $fetch(
        `/api/common/pictureCheck?url=${encodeURIComponent(props.url)}`
      );
      isValidPictureUrl.value = response.valid;
    } catch (error) {
      isValidPictureUrl.value = false;
    } finally {
      isLoading.value = false;
    }
  };

  watch(() => props.url, checkPictureUrl);
</script>

<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">載入中...</span>
      </div>
    </div>
    <div v-else-if="isValidPictureUrl && url" class="d-flex justify-content-center">
      <figure class="figure flex-column mb-4">
        <NuxtImg
          :src="url"
          :width="width"
          :height="height"
          class="figure-img rounded shadow-lg m-0" />
        <figcaption class="figure-caption text-center">預覽</figcaption>
      </figure>
    </div>
    <div
      v-else-if="!isValidPictureUrl && url"
      class="alert alert-danger text-center fs-6 p-0"
      role="alert">
      <span> 輸入的圖片網址無效,請檢查後重新輸入 </span>
    </div>
  </div>
</template>
