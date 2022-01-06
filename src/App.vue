<template>
  <div class="flex flex-col h-full">
    <main-header />
    <main class="flex-grow flex-shrink-0 pt-20">
      <router-view />
    </main>
    <main-footer />
  </div>
</template>
<script>
import { onMounted } from "vue";

import MainHeader from "@/components/Layout/MainHeader.vue";
import MainFooter from "@/components/Layout/MainFooter.vue";

import useAuth from "@/composable/api/useAuth";

export default {
  components: {
    MainHeader,
    MainFooter,
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
