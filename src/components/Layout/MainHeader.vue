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
        <div
          v-else
          class="flex-center relative"
          @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <div>
            <emoji-happy-icon
              v-if="!logined.imagePath && !logined.imagePath[0]"
              class="h-8 w-8"
            />
            <img
              v-else
              class="h-8 w-8 rounded-full overflow-hidden"
              :src="'https://jj-cse.online' + logined.imagePath[0]"
            />
          </div>
          <div
            v-if="showDropdown"
            class="
              flex flex-col
              absolute
              px-4
              py-2
              top-full
              right-0
              text-right
              transform
              translate-x-4
              -translate-y-4
              border border-gray-100
              rounded-lg
              shadow-lg
              bg-white
              whitespace-nowrap
            "
          >
            <router-link
              class="
                p-1
                border-b border-gray-300
                text-gray-500
                hover:text-black
                transition-colors
              "
              :to="{ name: 'Profile' }"
              >프로필</router-link
            >
            <button
              class="p-1 text-gray-500 hover:text-black transition-colors"
              @click="logout"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showMenus"
      class="
        text-xl
        fixed
        top-0
        left-0
        w-full
        h-full
        pl-24
        bg-black bg-opacity-50
      "
    >
      <div
        class="
          flex flex-col
          w-full
          h-full
          px-2
          pr-6
          py-6
          bg-white
          divide-y divide-gray-300
        "
      >
        <x-icon class="self-end h-8 mb-2" @click="showMenus = false" />
        <router-link class="p-2" :to="{ name: 'Notice', params: { page: 1 } }"
          >공지사항</router-link
        >
        <router-link class="p-2" :to="{ name: 'EventList' }"
          >학과 이벤트</router-link
        >
        <!-- <router-link to="/">커뮤니티</router-link> -->
        <router-link v-if="logined" :to="{ name: 'Profile' }" class="p-2"
          >프로필</router-link
        >
        <router-link class="p-2" v-if="!logined" :to="{ name: 'Login' }"
          >로그인</router-link
        >
        <button v-else class="text-left p-2" @click="logout">로그아웃</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { MenuIcon, XIcon, EmojiHappyIcon } from "@heroicons/vue/outline";

import useAuth from "@/composable/api/useAuth";

export default {
  components: {
    MenuIcon,
    XIcon,
    EmojiHappyIcon,
  },
  setup() {
    const route = useRoute();
    const { logined, logout } = useAuth();

    const showDropdown = ref(false);
    const showMenus = ref(false);

    watch(route, () => {
      showMenus.value = false;
    });

    return {
      logined,
      logout,
      showDropdown,
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
