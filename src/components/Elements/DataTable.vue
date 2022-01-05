<template>
  <div>
    <table class="w-full text-left">
      <thead>
        <tr>
          <th class="bg-gray-200 px-4 py-2" v-for="f in fields" :key="f.key">
            {{ f.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="
            border-b border-gray-300
            cursor-pointer
            transition
            duration-500
            hover:bg-primary hover:text-white
          "
          v-for="d in displayDatas"
          :key="d.content_id"
        >
          <td class="px-4 py-2">{{ d.content_id }}</td>
          <td class="px-4 py-2">{{ d.title }}</td>
          <td class="px-4 py-2">{{ d.user_name }}</td>
          <td class="px-4 py-2">{{ d.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  props: {
    fields: Array,
    data: Array,
    page: Number,
    limit: {
      type: Number,
      default: 8,
    },
  },
  setup(props) {
    const { data, page, limit } = toRefs(props);

    const displayDatas = computed(() => {
      const sp = (page.value - 1) * limit.value;
      const ep = page.value * limit.value;

      return data.value.slice(sp, ep);
    });

    return {
      displayDatas,
    };
  },
};
</script>

<style scoped>
th:first-child,
td:first-child,
th:nth-child(3),
td:nth-child(3),
th:last-child,
td:last-child {
  @apply px-8;
  width: 1%;
  white-space: nowrap;
}
</style>
