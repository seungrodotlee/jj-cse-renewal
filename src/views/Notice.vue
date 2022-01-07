<template>
  <div class="container mx-auto flex flex-col">
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
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import DataTable from "@/components/Elements/DataTable.vue";
import Pager from "@/components/Elements/Pager.vue";

import data from "@/dummys/notice";

export default {
  components: {
    DataTable,
    Pager,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const page = computed(() => parseInt(route.params.page));

    const fields = ref([
      {
        key: "content_id",
        label: "번호",
      },
      {
        key: "title",
        label: "제목",
      },
      {
        key: "user_name",
        label: "글쓴이",
      },
      {
        key: "created_at",
        label: "작성일",
      },
    ]);

    const items = data.fetched(data.content, data.user);

    const selectItem = (item) => {
      console.log(item);
      router.push({
        name: "Article",
        params: { board: "notice", idx: item.content_id },
      });
    };

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
