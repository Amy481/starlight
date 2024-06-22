<script lang="ts" setup>
  import type { User } from "~/types";

  const props = defineProps<{
    userId?: string;
  }>();

  const userStore = useUserStore();
  const { userInfo, isLogin } = storeToRefs(userStore);

  const user = ref<{
    id: string;
    name: string;
    avatar: string;
    email: string;
  } | null>(null);

  onMounted(async () => {
    if (props.userId) {
      // 如果有傳入 userId，則根據 userId 獲取創作者資料
      const data = await $fetch<User>(`/api/user/getUser?userId=${props.userId}`);
      user.value = data;
    } else if (isLogin.value) {
      // 如果是主頁面且使用者已登入，則使用 store 中的使用者資料
      user.value = userInfo.value;
    }
  });
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
    <div class="text-center mt-5">
      <div class="fw-bold">{{ user.name }}</div>
      <a :href="`mailto:${user.email}`" class="text-muted fw-light">{{ user.email }}</a>
    </div>
    <ul class="nav flex-column">
      <li class="nav-item mb-1">
        <NuxtLink class="nav-link" :to="`/user/${user.id}`">
          <i class="bi bi-house me-2"></i>{{ user.name }} 的文章</NuxtLink
        >
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
