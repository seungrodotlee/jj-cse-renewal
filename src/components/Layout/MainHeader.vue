<template>
  <div class="fixed w-full h-20 border-b border-black bg-white z-50">
    <div class="container mx-auto h-full flex justify-between">
      <router-link to="/" class="flex items-center">
        <img :src="require('/src/assets/img/main-logo.png')" />
      </router-link>
      <div class="nav-menus flex text-sm">
        <router-link to="/">공지사항</router-link>
        <router-link to="/">학과</router-link>
        <router-link to="/">이벤트</router-link>
        <router-link to="/">커뮤니티</router-link>
        <router-link to="/">FAQ</router-link>
        <router-link to="/">로그인</router-link>
        <router-link to="/">프로필</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-menus > a {
  @apply flex justify-center items-center mr-4 pb-2 pt-3 border-b-4 border-transparent;

  &:hover {
    @apply border-primary;
  }
}
</style>
