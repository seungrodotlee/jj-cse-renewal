<template>
  <div class="fixed w-full h-20 border-b border-black bg-white z-50">
    <div class="container mx-auto px-4 sm:px-0 h-full flex justify-between">
      <router-link to="/" class="flex items-center">
        <img :src="require('/src/assets/img/main-logo.png')" />
      </router-link>
      <div class="flex justify-center items-center sm:hidden">
        <menu-icon class="h-12 p-2" @click="showMenus = true" />
      </div>
      <div class="nav-menus hidden sm:flex text-sm">
        <router-link :to="{ name: 'Notice', params: { page: 1 } }"
          >공지사항</router-link
        >
        <router-link :to="{ name: 'EventList' }">학과 이벤트</router-link>
        <!-- <router-link to="/">커뮤니티</router-link> -->
        <router-link v-if="!logined" :to="{ name: 'Login' }"
          >로그인</router-link
        >
        <button v-else @click="logout">로그아웃</button>
        <router-link v-if="logined" :to="{ name: 'Profile' }"
          >프로필</router-link
        >
      </div>
    </div>
    <div
      v-if="showMenus"
      class="
        flex-center flex-col
        text-xl
        fixed
        top-0
        left-0
        w-full
        h-full
        bg-white
      "
    >
      <router-link class="mb-2" :to="{ name: 'Notice', params: { page: 1 } }"
        >공지사항</router-link
      >
      <router-link class="mb-2" :to="{ name: 'EventList' }"
        >학과 이벤트</router-link
      >
      <!-- <router-link to="/">커뮤니티</router-link> -->
      <router-link class="mb-2" v-if="!logined" :to="{ name: 'Login' }"
        >로그인</router-link
      >
      <button v-else class="mb-2" @click="logout">로그아웃</button>
      <router-link v-if="logined" :to="{ name: 'Profile' }">프로필</router-link>
      <x-icon class="absolute top-4 right-4 h-8" @click="showMenus = false" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { MenuIcon, XIcon } from "@heroicons/vue/outline";

import useAuth from "@/composable/api/useAuth";

export default {
  components: {
    MenuIcon,
    XIcon,
  },
  setup() {
    const route = useRoute();
    const { logined, logout } = useAuth();

    const showMenus = ref(false);

    watch(route, () => {
      showMenus.value = false;
    });

    return {
      logined,
      logout,
      showMenus,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-menus > a,
.nav-menus > button {
  @apply flex justify-center items-center mr-6 pb-2 pt-3 border-b-4 border-transparent;

  &:hover {
    @apply border-primary;
  }

  &:last-child {
    @apply mr-0;
  }
}

.router-link-active {
  @apply text-primary pointer-events-none;
}
</style>
