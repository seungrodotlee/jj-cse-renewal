<template>
  <div class="flex flex-col">
    <main-header />
    <main class="flex-grow h-full pt-20">
      <router-view />
    </main>
  </div>
</template>
<script>
import { onMounted } from "vue";

import MainHeader from "@/components/Layout/MainHeader.vue";

import useAuth from "@/composable/api/useAuth";

export default {
  components: {
    MainHeader,
  },
  setup() {
    const { login } = useAuth();

    onMounted(async () => {
      const result = await login();

      if (result.state) {
        console.log("logined", result.data);
      }
    });
  },
};
</script>
<style lang="scss"></style>
