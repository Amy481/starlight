<script lang="ts" setup>
  import { toast } from "vue3-toastify";

  const notificationStore = useNotificationStore();
  if (notificationStore.isNotification) {
    notificationStore.notificationFail();
    toast.success(notificationStore.notificationMessage);
  }
</script>

<template>
  <div>Page: user/login</div>
</template>

<style scoped></style>
