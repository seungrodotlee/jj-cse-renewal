<template>
  <div class="container mx-auto flex flex-col">
    <p class="text-2xl font-bold my-4">공지사항</p>
    <data-table
      class="w-full mb-4"
      :fields="fields"
      :data="items"
      :page="page"
    />
    <pager
      class="self-end mb-4"
      :current="page"
      :total="Math.ceil(items.length / 8)"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

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

    const page = computed(() => parseInt(route.params.page));

    const contents = data.content.sort((a, b) => {
      return b.content_id - a.content_id;
    });

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

    const items = contents.map((c) => {
      return {
        ...c,
        user_name: data.user.filter((u) => {
          return c.user_id === u.user_id;
        })[0].name,
      };
    });

    console.log(items);

    return {
      page,
      fields,
      items,
    };
  },
};
</script>

<style></style>
