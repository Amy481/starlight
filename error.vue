<script setup>
  defineProps({
    error: Object,
  });

  const handleError = () => {
    clearError({ redirect: "/" });
  };
</script>

<template>
  <div class="page-container vh-100">
    <TheHeader />
    <div class="content-container d-flex align-items-center justify-content-center text-dark">
      <div class="row m-0">
        <img
          src="~/assets/svg/error.svg "
          class="img-fluid col-6 d-none d-lg-block"
          alt="error image" />
        <div class="col-lg-6 col-12">
          <div class="text-center">
            <h1 class="display-1 fw-bold mb-4">{{ error.statusCode }}</h1>
          </div>
          <div class="text-center">
            <h2 class="mb-3">噢不！發生錯誤 🙁</h2>
            <p class="lead mb-4">{{ error.message }}</p>
            <button class="btn btn-outline-dark" @click="handleError">清除錯誤後回到首頁</button>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
  .page-container {
    display: flex;
    flex-direction: column;
  }

  .content-container {
    flex: 1;
  }
</style>
