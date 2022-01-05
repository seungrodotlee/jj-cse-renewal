<template>
  <div
    class="
      overlay
      fixed
      w-full
      h-full
      top-0
      left-0
      flex-center
      bg-black bg-opacity-30
      z-50
    "
  >
    <div
      class="absolute w-full h-full top-0 left-0"
      @click="clickOverlayedArea"
    ></div>
    <div
      class="popup relative rounded-xl bg-white px-6 py-4 shadow-lg z-10"
      :style="`width: ${width}`"
    >
      <div class="flex items-start justify-between mb-4">
        <p class="text-2xl font-black">{{ title }}</p>
        <button @click="close"><x-icon class="w-6 h-6 text-black" /></button>
      </div>
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    XIcon,
  },
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
      default: "512px",
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    const clickOverlayedArea = () => {
      close();
    };

    return {
      close,
      clickOverlayedArea,
    };
  },
};
</script>

<style></style>
