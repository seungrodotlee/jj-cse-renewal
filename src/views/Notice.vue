<template>
  <div class="container mx-auto flex flex-col" v-if="items">
    <p
      class="
        px-4
        sm:px-0
        text-3xl
        font-black
        py-4
        mb-4
        border-b border-gray-300
      "
    >
      공지사항
    </p>
    <data-table
      class="w-full mb-4"
      :fields="fields"
      :data="items"
      :page="page"
      @itemSelected="selectItem"
    />
    <pager
      class="self-end mb-4 mr-4 sm:mr-0"
      :current="page"
      :total="Math.ceil(items.length / 8)"
    />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import DataTable from "@/components/Elements/DataTable.vue";
import Pager from "@/components/Elements/Pager.vue";

import useBoard from "@/composable/api/useBoard";

export default {
  components: {
    DataTable,
    Pager,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { fetchNotices } = useBoard();

    const page = computed(() => parseInt(route.params.page) - 1);

    const fields = ref([
      {
        key: "id",
        label: "번호",
      },
      {
        key: "title",
        label: "제목",
      },
      {
        key: "writer",
        label: "글쓴이",
      },
      {
        key: "created_at",
        label: "작성일",
      },
    ]);

    const items = ref(null);

    const selectItem = (item) => {
      router.push({
        name: "Article",
        params: { board: "notices", idx: item.id },
      });
    };

    onMounted(async () => {
      const result = await fetchNotices(page.value);
      items.value = result[0].child;
    });

    return {
      page,
      fields,
      items,
      selectItem,
    };
  },
};
</script>

<style></style>
