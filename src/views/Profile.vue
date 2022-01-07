<template>
  <div class="container mx-auto">
    <p class="text-3xl font-black py-4 mb-4 border-b border-gray-300">
      기본정보
    </p>
    <div class="flex p-4 rounded-xl bg-gray-200">
      <div class="flex-center w-1/3 mr-8">
        <img
          class="h-80 w-80 rounded-full object-contain"
          :src="profileImage"
        />
      </div>
      <div class="flex flex-col flex-grow">
        <dynamic-input
          class="mb-2"
          :data="nameInput"
          @update="nameInput.onUpdate"
        />
        <div class="flex mb-2">
          <dynamic-input
            class="w-2/3 mr-2"
            :data="idInput"
            @update="idInput.onUpdate"
          />
          <dynamic-input
            class="w-1/3"
            :data="yearInput"
            @update="yearInput.onUpdate"
          />
        </div>
        <dynamic-input
          class="mb-2"
          :data="majorInput"
          @update="majorInput.onUpdate"
        />
        <dynamic-input
          class="mb-2"
          :data="clubInput"
          @update="clubInput.onUpdate"
        />
        <dynamic-input
          :isTextArea="true"
          :data="infoInput"
          @update="infoInput.onUpdate"
        />
      </div>
    </div>
    <button class="w-full py-4 mt-4 rounded-xl bg-primary text-white">
      저장
    </button>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";

import DynamicInput from "@/components/Form/DynamicInput.vue";

import useAuth from "@/composable/api/useAuth";
import useInput from "@/composable/Form/useInput";

export default {
  components: {
    DynamicInput,
  },
  setup() {
    const { logined } = useAuth();
    const { generate } = useInput();

    const profileImage = ref(null);

    const nameInput = generate({
      placeholder: "이름",
    });

    const idInput = generate({
      placeholder: "학번",
    });

    const yearInput = generate({
      placeholder: "학년",
    });

    const majorInput = generate({
      placeholder: "학부",
    });

    const clubInput = generate({
      placeholder: "동아리",
    });

    const infoInput = generate({
      placeholder: "간단 소개",
    });

    const fillInUserInfo = () => {
      console.log("u i", logined.value);

      profileImage.value = logined.value.imagePath
        ? "https://jj-cse.online" + logined.value.imagePath
        : "https://via.placeholder.com/500x500/FFFFFF/CED4DA?text=NO+PROFILE";
      nameInput.value.value = logined.value.name;
      idInput.value.value = logined.value.user_id;
      yearInput.value.value = logined.value.year;
      majorInput.value.value = logined.value.hakbu || "";
      clubInput.value.value = logined.value.clud || "";
      infoInput.value.value = logined.value.info || "";
    };

    onMounted(() => {
      if (logined.value) {
        fillInUserInfo();
      }
    });

    watch(logined, () => {
      fillInUserInfo();
    });

    return {
      profileImage,
      nameInput,
      idInput,
      yearInput,
      majorInput,
      clubInput,
      infoInput,
    };
  },
};
</script>

<style></style>
