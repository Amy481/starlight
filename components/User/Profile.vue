<script lang="ts" setup>
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const user = ref<{
    id: string;
    name: string;
    avatar: string;
    email: string;
  } | null>(null);

  user.value = userInfo.value;
</script>

<template>
  <div v-if="user" class="card border-1 mt-2 shadow-sm">
    <div class="image-container mt-4 mx-auto overflow-hidden">
      <NuxtImg
        :src="user.avatar"
        class="rounded-circle object-fit-cover w-100 h-100"
        alt="User Profile Picture"
        width="200"
        height="200"
        quality="90"
        loading="lazy"
        format="webp" />
    </div>
    <div class="text-center mt-3">
      <div class="fw-bold">{{ user.name }}</div>
      <div class="text-muted fw-light">{{ user.email }}</div>
    </div>
    <div class="profile-userbuttons text-center mt-3 mb-4">
      <button type="button" class="btn btn-follow btn me-2">
        <i class="bi bi-person-plus me-1"></i>追蹤
      </button>
      <button type="button" class="btn btn-outline-secondary btn">
        <i class="bi bi-chat-left-text me-1"></i>訊息
      </button>
    </div>
    <!-- SIDEBAR MENU -->
    <ul class="nav flex-column">
      <li class="nav-item mb-1">
        <NuxtLink class="nav-link" :to="`/user/${user.id}`">
          <i class="bi bi-house me-2"></i>{{ user.name }} 的文章</NuxtLink
        >
      </li>
      <li class="nav-item mb-1">
        <a class="nav-link" href="#"> <i class="bi bi-gear me-2"></i>帳號設置 </a>
      </li>
      <li class="nav-item mb-1">
        <NuxtLink class="nav-link" to="/article/create">
          <i class="bi bi-plus-lg me-2"></i>新增文章
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .image-container {
    width: 200px;
    height: 200px;
  }

  .btn-follow {
    border-color: darkslateblue;
    color: darkslateblue;
  }
  .btn-follow:hover {
    color: aliceblue;
    background-color: darkslateblue;
  }
  .nav-link {
    color: darkslateblue;
  }
  .nav-link:hover {
    color: aliceblue;
    background-color: darkslateblue;
  }
</style>
