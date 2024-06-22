<script lang="ts" setup>
  import type { Tag } from "~/types";

  const props = defineProps<{
    userId?: string;
  }>();

  const query = ref("/api/tag/topTags");
  // 如果有傳入 userId，在 query 後面加上 "?userId=${props.userId}"
  if (props.userId) {
    query.value += `?userId=${props.userId}`;
  }

  const { data: topTagsData } = await useFetch<{ topTags: Tag[] }>(query.value);
  const activeTopics = topTagsData.value?.topTags;

  const tagClass = ref("熱門標籤");
  // 如果有傳入 userId，將改為 "常用標籤"
  if (props.userId) {
    tagClass.value = "常用標籤";
  }
</script>

<template>
  <div class="popular-topics bg-gradient d-none d-md-block rounded-top shadow-sm p-1 mb-5">
    <h4 class="m-1 ms-3">{{ tagClass }}</h4>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="topic in activeTopics" :key="topic.name">
        <NuxtLink class="topic" :to="`/topic/${topic.name}`"># {{ topic.name }}</NuxtLink>
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
