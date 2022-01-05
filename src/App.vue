<template>
  <div class="flex flex-col">
    <main-header />
    <main class="flex-grow h-full pt-20">
      <router-view />
    </main>
  </div>
</template>
<script>
import MainHeader from "@/components/Layout/MainHeader.vue";

export default {
  components: {
    MainHeader,
  },
};
</script>
<style lang="scss"></style>
