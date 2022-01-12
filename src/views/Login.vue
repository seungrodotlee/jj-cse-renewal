<template>
  <div class="w-full h-full flex justify-center items-start">
    <div class="flex flex-col px-4 pt-16" style="width: 540px">
      <img
        class="self-center mb-4"
        :src="require('/src/assets/img/main-logo.png')"
      />
      <dynamic-input
        class="flex-grow mb-4"
        :data="idInput"
        @update="idInput.onUpdate"
      />
      <dynamic-input
        class="flex-grow mb-4"
        :inputType="'password'"
        :data="passwordInput"
        @update="passwordInput.onUpdate"
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
    <popup
      v-if="showRegistryPopup"
      :title="'전주대학교 계정 연동'"
      @close="router.push({ name: 'Login' })"
    >
      <template #content>
        <div class="flex flex-col">
          <dynamic-input
            class="flex-grow mb-4"
            :isSmall="true"
            :data="idInputReg"
            @update="idInputReg.onUpdate"
          />
          <dynamic-input
            class="flex-grow mb-4"
            :isSmall="true"
            :inputType="'password'"
            :data="passwordInputReg"
            @update="passwordInputReg.onUpdate"
          />
          <check-box
            class="mb-4"
            :label="'개인정보 활용 동의'"
            v-model:checked="privacyChecked"
          />
          <button
            class="py-4 text-xl rounded-xl font-bold bg-primary text-white"
            @click="tryRegistry"
          >
            연동하기
          </button>
        </div>
      </template>
    </popup>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import DynamicInput from "@/components/Form/DynamicInput.vue";
import CheckBox from "@/components/Form/CheckBox.vue";
import Popup from "@/components/Elements/Popup.vue";

import useAuth from "@/composable/api/useAuth";
import useInput from "@/composable/Form/useInput";

export default {
  components: {
    DynamicInput,
    CheckBox,
    Popup,
  },
  setup() {
    const { login, register } = useAuth();
    const route = useRoute();
    const router = useRouter();
    const { generate } = useInput();

    const idInput = generate({
      placeholder: "학번",
      fixCondition: (data) => {
        if (isNaN(data)) {
          return data.slice(0, data.length - 1);
        }
      },
      errorCondition: (data) => {
        if (data.length !== 9) return "학번은 9자리로 입력해주세요!";
      },
    });

    const passwordInput = generate({
      placeholder: "비밀번호",
      errorCondition: (data) => {
        if (data.length === 0) return "비밀번호를 입력해주세요!";
      },
    });

    const tryLogin = async () => {
      const result = await login({
        id: idInput.value.value,
        pw: passwordInput.value.value,
      });

      if (!result.state) {
        alert(result.message);
      } else {
        if (result.state) {
          router.push({ name: "Home" });
        }
      }
    };

    const showRegistryPopup = computed(() => {
      if (route.name === "Registry") return true;

      return false;
    });

    const idInputReg = generate({
      placeholder: "학번",
      fixCondition: (data) => {
        if (isNaN(data)) {
          return data.slice(0, data.length - 1);
        }
      },
      errorCondition: (data) => {
        if (data.length !== 9) return "학번은 9자리로 입력해주세요!";
      },
    });

    const passwordInputReg = generate({
      placeholder: "비밀번호",
      errorCondition: (data) => {
        if (data.length === 0) return "비밀번호를 입력해주세요!";
      },
    });

    const privacyChecked = ref(false);

    const tryRegistry = async () => {
      const result = await register({
        id: idInputReg.value.value,
        pw: passwordInputReg.value.value,
      });

      if (!result.state) {
        alert(result.error.message);
      } else {
        router.push({ name: "Home" });
      }
    };

    return {
      router,
      idInput,
      passwordInput,
      tryLogin,
      showRegistryPopup,
      idInputReg,
      passwordInputReg,
      privacyChecked,
      tryRegistry,
    };
  },
};
</script>

<style></style>
