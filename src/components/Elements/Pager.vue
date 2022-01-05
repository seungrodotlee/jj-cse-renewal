<template>
  <ul class="list-pagers flex">
    <li class="list-pager-item mr-6">
      <button :class="prevBtnClass" @click="setCurrentItem(current - 1)">
        <chevron-left-icon class="w-4 h-4" />
      </button>
    </li>
    <li
      v-for="i in displayList"
      :key="i"
      class="list-pager-item mr-4"
      :class="[i === parseInt(current) ? 'current' : '']"
    >
      <button @click="setCurrentItem(i)">
        {{ i }}
      </button>
    </li>
    <li class="list-pager-item ml-2">
      <button :class="nextBtnClass" @click="setCurrentItem(current + 1)">
        <chevron-right-icon class="w-4 h-4" />
      </button>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    total: Number,
    displayCount: {
      type: Number,
      default: 5,
    },
    current: Number,
    autoChangeRoute: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();

    const { displayCount, current, total, autoChangeRoute } = toRefs(props);
    const displayList = ref([]);

    const prevBtnClass = computed(() => {
      if (current.value - 1 > 0) return "";
      return "bg-gray-200 text-gray-500 pointer-events-none";
    });

    const nextBtnClass = computed(() => {
      if (current.value < total.value) return "";
      return "bg-gray-200 text-gray-500 pointer-events-none";
    });

    const resetList = () => {
      displayList.value = [];

      if (total.value < displayCount.value) {
        for (let i = 0; i < total.value; i++) {
          displayList.value.push(i + 1);
        }
      } else {
        let adj = current.value % displayCount.value;
        adj = adj === 0 ? displayCount.value : adj;
        let start = current.value - adj + 1;

        for (let i = 0; i < displayCount.value; i++) {
          displayList.value.push(start + i);
        }
      }
    };

    const setCurrentItem = (idx) => {
      emit("change", idx);

      if (autoChangeRoute.value) {
        router.push({
          name: route.name,
          params: {
            page: idx,
          },
        });
      }
    };

    resetList();

    watch(current, () => {
      resetList();
    });

    watch(total, () => {
      resetList();
    });

    return {
      prevBtnClass,
      nextBtnClass,
      displayList,
      setCurrentItem,
    };
  },
};
</script>

<style lang="scss">
.list-pager-item {
  button {
    @apply flex justify-center items-center rounded-lg bg-white border-gray-300 border;
    height: 40px;
    width: 40px;

    &:hover {
      border: 0;
      background-color: #d4e6ff;
    }
  }

  &.current button {
    @apply bg-primary text-white;
    border: none;
  }
}
</style>
