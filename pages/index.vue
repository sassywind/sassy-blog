<template>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/${content.id}`">{{ content.title }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  async asyncData() {
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      "https://sassy.microcms.io/api/v1/blog",
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { "X-API-KEY": "2f404a09-ae30-4adf-9df9-178602ea398c" }
      }
    );
    return data;
  }
};
</script>
