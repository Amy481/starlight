<script lang="ts" setup>
  import type { User } from "~/types";
  const { isPasswordVisible, handlePasswordVisible } = usePasswordVisibility();
  useSeoMeta({
    title: "註冊 - Starlight 星光平台",
    ogTitle: "註冊您的星光帳戶",
    description:
      "註冊以繼續在 Starlight 星光平台上發表和探索創意內容。加入我們的創作社群，分享你的創意作品。",
    ogDescription: "透過註冊開始在 Starlight 星光探索熱門創作、發表文章和與其他創作者互動。",
    ogImage: "/starlight-background.jpg",
    twitterCard: "summary_large_image",
  });

  const user: Ref<User> = ref({
    id: "",
    name: "",
    email: "",
    password: "",
    avatar: "",
    emailVerified: false,
  });

  const handleRegister = () => {};
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="col-6 d-none d-lg-block m-5">
      <img src="~/assets/svg/login.svg" class="img-fluid" alt="login image" />
    </div>
    <div class="col-lg-6 col-12 mb-5">
      <div class="divider my-4">
        <h1 class="text-center mx-3">註冊帳號</h1>
      </div>
      <form @submit="handleRegister">
        <div class="input-group mb-1">
          <span class="input-group-text">用戶頭像</span>
          <input
            v-model="user.avatar"
            type="url"
            name="avatar"
            id="avatar"
            class="form-control form-control-sm"
            placeholder="請輸入圖片網址" />
          <label for="avatar" class="text-muted fs-6 fw-lighter text-end">
            建議尺寸200px*200px，將自動調整為最適大小
          </label>
        </div>
        <PictureValidator :url="user.avatar" :width="200" :height="200" />
        <div class="form-floating mb-4">
          <input
            v-model="user.name"
            type="text"
            name="name"
            id="nameInput"
            class="form-control"
            rules="name"
            autocomplete="username"
            placeholder="請輸入用戶暱稱" />
          <label for="nameInput">用戶名稱</label>
        </div>
        <div class="form-floating mb-4">
          <input
            v-model="user.email"
            name="email"
            type="email"
            id="emailInput"
            class="form-control"
            placeholder="請輸入電子郵件"
            autocomplete="email"
            rules="email" />
          <label for="emailInput">帳號</label>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="form-floating">
              <input
                v-model="user.password"
                name="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                id="passwordInput"
                class="form-control form-floating border-end-0 password"
                placeholder="請輸入密碼"
                autocomplete="new-password"
                rules="password" />
              <label for="passwordInput">密碼</label>
            </div>
            <span
              class="input-group-text bg-white border-start-0 password"
              @click="handlePasswordVisible">
              <i v-if="!isPasswordVisible" class="bi bi-eye-slash"> </i>
              <i v-if="isPasswordVisible" class="bi bi-eye"></i>
            </span>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-lg mt-4">註冊</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .text-end {
    width: 100%;
  }
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
