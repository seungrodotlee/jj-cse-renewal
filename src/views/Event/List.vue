<template>
  <div class="container mx-auto mb-4">
    <p
      class="
        text-3xl
        font-black
        py-4
        mb-4
        px-4
        sm:px-0
        border-b border-gray-300
      "
    >
      이벤트 목록
    </p>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 sm:px-0">
      <div v-for="e in eventList" :key="e.id" class="flex flex-col">
        <img
          class="flex-grow object-cover rounded-lg"
          :src="
            e.images ? e.images[0] : 'https://via.placeholder.com/1000x1000'
          "
        />
        <div class="flex items-center text-sm mt-4 mb-2">
          <p
            class="px-2 py-1 mr-2 rounded-md"
            :class="`bg-blue-200 text-blue-600`"
          >
            {{ e.host }}
          </p>
          <p
            v-html="e.status"
            class="px-2 py-1 mr-2 rounded-md"
            :class="`bg-${e.color}-200 text-${e.color}-600`"
          ></p>
          <p
            v-if="e.timeLeft"
            class="px-2 py-1 rounded-md bg-gray-200 text-gray-600"
          >
            D-{{ e.timeLeft }}
          </p>
        </div>
        <p class="text-xl font-bold">{{ e.title }}</p>
        <text-box class="text font-bold mb-2" :line="1" :content="e.subText" />
        <text-box :line="3" :content="e.content" />
        <router-link
          :to="{ name: 'JoinEvent', params: { idx: e.id } }"
          class="flex-center mt-2 py-2 rounded-lg bg-primary text-white"
          :class="!e.joined && !e.enabled ? 'disabled' : ''"
          >{{ e.joined ? "내 신청정보" : "신청하기" }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

import TextBox from "@/components/Elements/TextBox.vue";

import useAuth from "@/composable/api/useAuth";
import useEvent from "@/composable/api/useEvent";

export default {
  components: {
    TextBox,
  },
  setup() {
    const { eventList, fetchEventList } = useEvent();
    const { logined } = useAuth();

    onMounted(() => {
      fetchEventList();
    });

    watch(logined, () => {
      fetchEventList();
    });

    return {
      eventList,
    };
  },
};
</script>

<style></style>
