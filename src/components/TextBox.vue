<template>
  <div
    class="text-box"
    :style="`line-height: ${font * 1.2}rem; height: ${
      font * 1.2 * line
    }rem; -webkit-line-clamp: ${line}`"
  >
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    line: Number,
    font: {
      type: Number,
      default: 1,
    },
    content: String,
  },
};
</script>

<style>
.text-box {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
