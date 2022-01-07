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
import { onMounted, watch } from "vue";

import MainHeader from "@/components/Layout/MainHeader.vue";
import MainFooter from "@/components/Layout/MainFooter.vue";

import useAuth from "@/composable/api/useAuth";
import { PhoneIncomingIcon } from "@heroicons/vue/outline";

export default {
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {
    const { login, logined } = useAuth();

    onMounted(async () => {
      const result = await login();

      if (!result.state) {
        console.log(result);
      }
    });

    watch(logined, (to) => {
      console.log(to);
    });
  },
};
</script>
<style lang="scss"></style>
