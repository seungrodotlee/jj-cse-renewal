<template>
  <div class="container mx-auto flex flex-col pt-8">
    <div
      class="
        flex
        justify-between
        items-end
        pb-4
        px-4
        sm:px-0
        border-b border-gray-600
      "
    >
      <div>
        <p class="text-gray-600 font-bold">{{ data.id }}</p>
        <p class="text-3xl font-black mt-2">{{ data.title }}</p>
      </div>
      <div class="text-right text-sm text-gray-600 font-bold">
        <p>{{ data.writer }}</p>
        <p>{{ data.created_at }}</p>
        <p>{{ data.views }} views</p>
      </div>
    </div>
    <article class="py-4 px-4 sm:px-0">
      {{ data.content }}
    </article>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useBoard from "@/composable/api/useBoard";

export default {
  setup() {
    const route = useRoute();
    const { fetchArticle } = useBoard();

    const data = ref({});

    const fetchData = async () => {
      const result = await fetchArticle(route.params.idx);

      //console.log(result);

      data.value = result;
    };

    onMounted(() => {
      fetchData();
    });

    watch(route, (to) => {
      fetchData();
    });

    return {
      data,
    };
  },
};
</script>

<style></style>
