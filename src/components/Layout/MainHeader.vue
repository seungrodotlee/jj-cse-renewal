<template>
  <div class="fixed w-full h-20 border-b border-black bg-white z-50">
    <div class="container mx-auto h-full flex justify-between">
      <router-link to="/" class="flex items-center">
        <img :src="require('/src/assets/img/main-logo.png')" />
      </router-link>
      <div class="nav-menus flex text-sm">
        <router-link :to="{ name: 'Notice', params: { page: 1 } }"
          >공지사항</router-link
        >
        <router-link to="/">학과 이벤트</router-link>
        <router-link to="/">커뮤니티</router-link>
        <router-link to="/">FAQ</router-link>
        <router-link v-if="!logined" :to="{ name: 'Login' }"
          >로그인</router-link
        >
        <button v-else @click="logout">로그아웃</button>
        <router-link v-if="logined" to="/">프로필</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from "@/composable/api/useAuth";

export default {
  setup() {
    const { logined, logout } = useAuth();

    return {
      logined,
      logout,
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
</style>
