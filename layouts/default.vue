<script lang="ts" setup></script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <TheHeader />
    <div class="flex-fill">
      <slot class="flex-fill" />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped></style>
