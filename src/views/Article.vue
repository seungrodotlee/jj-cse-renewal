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
        <p class="text-gray-600 font-bold">{{ data.content_id }}</p>
        <p class="text-3xl font-black mt-2">{{ data.title }}</p>
      </div>
      <div class="text-right text-sm text-gray-600 font-bold">
        <p>{{ data.user_name }}</p>
        <p>{{ data.created_at }}</p>
      </div>
    </div>
    <article class="py-4 px-4 sm:px-0">
      {{ data.context }}
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
    const board = useBoard();

    const data = ref({});

    const fetchData = async () => {
      const casedBoard = route.params.board.replace(/(^[a-z]|-[a-z])/g, (g) => {
        return g.replace("-", "").toUpperCase();
      });

      data.value = await board[`get${casedBoard}`](route.params.idx);
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
