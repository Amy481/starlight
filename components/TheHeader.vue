<script lang="ts" setup>
  const userInfo = ref({
    id: "1",
    name: "Alice Johnson",
    avatar: "https://picsum.photos/id/1011/200/200",
    email: "alice.johnson@example.com",
    password: "abc123",
  });
  const isLogin = ref(false);
  const handleLogout = async () => {};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm navbar-fixed-top">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand fw-bold fs-3" to="/"> Starlight </NuxtLink>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="visually-hidden">Toggle navigation</span>
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/article/list">熱門創作</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/article/create">新增創作</NuxtLink>
            </li>
          </ul>
          <NuxtLink v-if="!isLogin" class="nav-link" to="/user/login"
            ><i class="bi bi-person-circle me-1"></i>登入</NuxtLink
          >
          <ul v-if="isLogin" class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <NuxtImg
                  :src="userInfo.avatar"
                  width="50"
                  height="50"
                  class="avatar me-1"
                  format="webp"
                  alt="用戶頭像" />
                {{ userInfo.name }}
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDarkDropdownMenuLink">
                <li><a class="dropdown-item" href="#">我的創作</a></li>
                <li><NuxtLink class="dropdown-item" to="/article/create">新增創作</NuxtLink></li>
                <hr class="dropdown-divider" />

                <li><a class="dropdown-item" @click="handleLogout" href="#">登出</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  .nav-link:hover {
    color: #0056b3;
  }

  .navbar-toggler {
    border: none;
    outline: none;
  }

  .navbar-toggler:focus {
    box-shadow: none;
  }

  .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    background-color: #333;
    margin: 5px 0;
    transition: all 0.2s;
  }

  .top-bar {
    transform: rotate(0);
    transform-origin: 3% center;
  }

  .middle-bar {
    opacity: 1;
  }

  .bottom-bar {
    transform: rotate(0);
    transform-origin: 6% center;
  }

  .navbar-toggler:not(.collapsed) .top-bar {
    transform: rotate(45deg);
  }

  .navbar-toggler:not(.collapsed) .middle-bar {
    opacity: 0;
  }

  .navbar-toggler:not(.collapsed) .bottom-bar {
    transform: rotate(-45deg);
  }
</style>