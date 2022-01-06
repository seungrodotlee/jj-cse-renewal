<template>
  <div class="container mx-auto">
    <p class="text-3xl font-black py-4 mb-4 border-b border-gray-300">
      이벤트 목록
    </p>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="e in eventList" :key="e.id" class="flex flex-col">
        <img
          class="flex-grow object-cover rounded-lg"
          :src="
            e.images ? e.images[0] : 'https://via.placeholder.com/1000x1000'
          "
        />
        <div class="flex items-center text-sm mt-4 mb-2">
          <p
            v-html="e.status"
            class="px-2 py-1 mr-2 rounded-md bg-blue-300"
          ></p>
          <p v-if="e.timeLeft">D-{{ e.timeLeft }}</p>
        </div>
        <p class="text-xl font-bold">{{ e.title }}</p>
        <text-box class="text font-bold mb-2" :line="1" :content="e.subText" />
        <text-box :line="3" :content="e.content" />
        <router-link
          :to="{ name: 'JoinEvent', params: { idx: e.id } }"
          class="flex-center py-2 rounded-lg bg-primary text-white"
          >응모하기</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import TextBox from "@/components/Elements/TextBox.vue";

import useEvent from "@/composable/api/useEvent";

export default {
  components: {
    TextBox,
  },
  setup() {
    const { eventList, fetchEventList } = useEvent();

    onMounted(() => {
      fetchEventList();
    });

    return {
      eventList,
      getImagePath,
    };
  },
};
</script>

<style></style>
