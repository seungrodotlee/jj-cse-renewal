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
            :placeholder="'학번'"
            v-model:errored="idInputReg.errored"
            :errorLabel="idInputReg.errorLabel"
            v-model:value="idInputReg.value"
            :validator="idInputReg.validator"
          />
          <dynamic-input
            class="flex-grow mb-4"
            :isSmall="true"
            :placeholder="'비밀번호'"
            :inputType="'password'"
            v-model:errored="passwordInputReg.errored"
            :errorLabel="passwordInputReg.errorLabel"
            v-model:value="passwordInputReg.value"
            :validator="passwordInputReg.validator"
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

    const idInput = ref(
      useInput({
        placeholder: "학번",
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
      }).generated
    );

    const passwordInput = ref(
      useInput({
        placeholder: "비밀번호",
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
      }).generated
    );

    const tryLogin = async () => {
      const result = await login({
        id: idInput.value.value,
        pw: passwordInput.value.value,
      });

      if (!result.state) {
        alert(result.error.message);
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

    const idInputReg = ref(
      useInput({
        placeholder: "학번",
        validator: (data) => {
          if (data.length === 0) {
            idInputReg.value.errorLabel = "학번을 입력해주세요!";

            return {
              result: false,
            };
          }

          return {
            result: true,
          };
        },
      }).generated
    );

    const passwordInputReg = ref(
      useInput({
        placeholder: "비밀번호",
        validator: (data) => {
          if (data.length === 0) {
            passwordInputReg.value.errorLabel = "비밀번호를 입력해주세요!";

            return {
              result: false,
            };
          }

          return {
            result: true,
          };
        },
      }).generated
    );

    const privacyChecked = ref(false);

    const tryRegistry = async () => {
      const result = await register({
        id: idInputReg.value.value,
        pw: passwordInputReg.value.value,
      });

      if (!result.state) {
        alert(result.error.message);
      } else {
        if (result.state) {
          router.push({ name: "Home" });
        }
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
