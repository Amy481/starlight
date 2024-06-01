<script lang="ts" setup>
  import { toast } from "vue3-toastify";
  const { isPasswordVisible, handlePasswordVisible } = usePasswordVisibility();
  useSeoMeta({
    title: "登入 - Starlight 星光平台",
    ogTitle: "登入您的星光帳戶",
    description:
      "登入以繼續在 Starlight 星光平台上發表和探索創意內容。加入我們的創作社群，分享你的創意作品。",
    ogDescription:
      "透過您的帳號登入並開始在 Starlight 星光探索熱門創作、發表文章和與其他創作者互動。",
    ogImage: "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });
  const notificationStore = useNotificationStore();
  if (notificationStore.isNotification) {
    notificationStore.notificationFail();
    toast.success(notificationStore.notificationMessage);
  }
  const rememberMe = ref(false);
  const loginData = ref({
    email: "",
    password: "",
  });
  registerValidationRules();

  const handleEmailLogin = async () => {
    try {
      const { success, message } = await $fetch("/api/user/login", {
        method: "POST",
        body: loginData.value,
      });

      if (success) {
        notificationStore.notificationMessage = message;
        notificationStore.notificationSuccess();
        navigateTo("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("登入失敗", error);
      toast.error((error as Error).message || "登入時發生錯誤，請稍後再試。");
    }
  };
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="col-6 d-none d-lg-block">
      <img src="~/assets/svg/login.svg" class="img-fluid" alt="login image" />
    </div>
    <div class="col-lg-6 col-12">
      <div class="divider my-4">
        <h1 class="text-center mx-3">登入帳號</h1>
      </div>
      <VForm @submit="handleEmailLogin" v-slot="{ meta, errors }">
        <div class="form-floating mb-4">
          <VField
            v-model="loginData.email"
            name="email"
            type="email"
            id="emailInput"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入電子郵件"
            autocomplete="email"
            rules="email" />
          <label for="emailInput">帳號</label>
          <VErrorMessage name="email" class="invalid-feedback" />
        </div>
        <div class="form-group mb-4">
          <div class="input-group">
            <div class="form-floating">
              <VField
                v-model="loginData.password"
                name="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                id="passwordInput"
                class="form-control form-floating border-end-0 password"
                :class="{ 'is-invalid': errors['password'] }"
                placeholder="請輸入密碼"
                autocomplete="new-password"
                rules="password" />
              <label for="passwordInput">密碼</label>
              <VErrorMessage name="password" class="invalid-feedback" />
            </div>
            <span
              class="input-group-text bg-white border-start-0 password"
              @click="handlePasswordVisible"
              :class="{ 'border-danger': errors['password'] }">
              <i
                v-if="!isPasswordVisible"
                class="bi bi-eye-slash"
                :class="{ 'text-danger': errors['password'] }"></i>
              <i
                v-if="isPasswordVisible"
                class="bi bi-eye"
                :class="{ 'text-danger': errors['password'] }"></i>
            </span>
          </div>
          <a href="#!" class="d-flex justify-content-end align-items-center">忘記密碼？</a>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="form-check mb-0">
            <input
              v-model="rememberMe"
              class="form-check-input me-2"
              type="checkbox"
              id="form2Example3" />
            <label class="form-check-label" for="form2Example3"> 記住我 </label>
          </div>
        </div>
        <div class="text-center text-lg-start mt-4 pt-2">
          <button type="submit" :disabled="!meta.valid" class="btn btn-primary btn-lg">登入</button>
        </div>
        <p class="small fw-bold mt-2 pt-1 mb-0">
          還沒有帳號？ <NuxtLink to="/user/register" class="link-danger">註冊新帳號</NuxtLink>
        </p>
      </VForm>

      <div class="divider my-4">
        <p class="text-center fw-bold mx-3 mb-0">或者</p>
      </div>

      <button type="button" class="btn btn-lg btn-outline-primary btn-floating mb-4">
        <i class="fab fa-google-f"></i>
        <i class="bi bi-google"></i> 以google帳號登入
      </button>
    </div>
  </div>
</template>

<style scoped>
  .password {
    height: 3.7rem;
  }
  .form-floating > .form-control:not(:placeholder-shown) + label::after {
    background-color: transparent;
  }
  .form-floating .form-control:focus + label,
  .form-floating .form-control:not(:placeholder-shown) + label {
    font-size: smaller;
  }
</style>
