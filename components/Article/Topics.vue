<script lang="ts" setup>
  const { data: topTagsData } = await useFetch("/api/tag/topTags");
  const activeTopics = topTagsData.value?.topTags;

  const tagClass = ref("熱門標籤");
</script>
<template>
  <div class="popular-topics bg-gradient d-none d-md-block rounded-top shadow-sm p-1 mb-5">
    <h4 class="m-1 ms-3">{{ tagClass }}</h4>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="topic in activeTopics" :key="topic.tag">
        <NuxtLink class="topic" :to="`/topic/${topic.tag}`"># {{ topic.tag }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .popular-topics {
    background-color: lightgoldenrodyellow;
  }

  .list-group-item {
    background-color: lightgoldenrodyellow;
  }

  .list-group-item:hover {
    background-color: bisque;
  }

  .topic {
    color: chocolate;
    text-decoration: none;
  }

  .topic:hover {
    color: #4d2600;
    text-decoration: underline;
  }

  .badge:hover {
    background-color: white;
    color: black;
  }
</style>
