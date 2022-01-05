<template>
  <div class="container mx-auto">
    <p class="text-3xl font-black py-4 border-b border-600">이벤트 참여</p>
    <div>
      <div class="flex">
        <dynamic-input
          class="w-1/2 mr-4"
          :placeholder="nameInput.placeholder"
          v-model:errored="nameInput.errored"
          :errorLabel="nameInput.errorLabel"
          v-model:value="nameInput.value"
          :validator="nameInput.validator"
        />
        <dynamic-input class="w-1/4 mr-4" />
        <dynamic-input class="w-1/4" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DynamicInput from "@/components/Form/DynamicInput.vue";
import useInput from "@/composable/Form/useInput";

export default {
  components: {
    DynamicInput,
  },
  setup() {
    const nameInput = ref(
      useInput({
        placeholder: "이름",
        validator: (data) => {
          if (data.length < 2) {
            nameInput.value.errorLabel = "이름을 두글자 이상 입력해주세요!";

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

    return {
      nameInput,
    };
  },
};
</script>

<style></style>
