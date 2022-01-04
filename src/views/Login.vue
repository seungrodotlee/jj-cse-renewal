<template>
  <div class="w-full h-full flex justify-center items-start">
    <div class="flex flex-col px-4 pt-16" style="width: 540px">
      <img
        class="self-center mb-4"
        :src="require('/src/assets/img/main-logo.png')"
      />
      <dynamic-input
        class="flex-grow mb-4"
        :placeholder="'학번'"
        v-model:errored="idInput.errored"
        :errorLabel="idInput.errorLabel"
        v-model:value="idInput.value"
        :validator="idInput.validator"
      />
      <dynamic-input
        class="flex-grow mb-4"
        :placeholder="'비밀번호'"
        :inputType="'password'"
        v-model:errored="passwordInput.errored"
        :errorLabel="passwordInput.errorLabel"
        v-model:value="passwordInput.value"
        :validator="passwordInput.validator"
      />
      <button
        class="py-4 rounded-xl bg-primary text-white mb-4"
        @click="tryLogin"
      >
        로그인
      </button>
      <div class="flex justify-between">
        <a href="https://instar.jj.ac.kr/" target="_blank">아이디 찾기</a>
        <router-link :to="{ name: 'Registry' }">연동하기</router-link>
        <a href="https://instar.jj.ac.kr/" target="_blank">비밀번호 찾기</a>
      </div>
    </div>
    <div>
      {{ showRegistryPopup }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import DynamicInput from "../components/DynamicInput.vue";
import useAuth from "../composable/api/useAuth";

export default {
  components: {
    DynamicInput,
  },
  setup() {
    const { login } = useAuth();
    const route = useRoute();

    const idInput = ref({
      errored: false,
      errorLabel: "",
      value: "",
      validator: (data) => {
        if (data.length === 0) {
          idInput.value.errorLabel = "학번을 입력해주세요!";

          return {
            result: false,
          };
        }

        return {
          result: true,
        };
      },
    });

    const passwordInput = ref({
      errored: false,
      errorLabel: "",
      value: "",
      validator: (data) => {
        if (data.length === 0) {
          passwordInput.value.errorLabel = "비밀번호를 입력해주세요!";
          return {
            result: false,
          };
        }

        return {
          result: true,
        };
      },
    });

    const tryLogin = async () => {
      const result = await login({
        id: idInput.value.value,
        pw: passwordInput.value.value,
      });

      if (!result.state) {
        alert(result.error.message);
      }
    };

    const showRegistryPopup = computed(() => {
      if (route.name === "Registry") return true;

      return false;
    });

    return {
      idInput,
      passwordInput,
      tryLogin,
      showRegistryPopup,
    };
  },
};
</script>

<style></style>
