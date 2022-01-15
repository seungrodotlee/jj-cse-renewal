<template>
  <div class="container mx-auto">
    <p
      class="
        text-3xl
        font-black
        py-4
        mb-4
        px-4
        sm:px-0
        border-b border-gray-300
      "
    >
      기본정보
    </p>
    <div class="px-4 sm:px-0">
      <div
        class="
          flex flex-col
          items-center
          md:flex-row
          p-4
          rounded-xl
          bg-gray-200
        "
      >
        <div class="flex-center flex-col w-1/2 sm:w-1/3 mr-8 mb-4 md:mb-0">
          <img
            class="
              sm:w-80
              max-w-full
              rounded-full
              object-contain
              overflow-hidden
            "
            :src="profileImage"
          />
          <fieldset class="flex relative">
            <input
              id="profile-img"
              class="absolute opacity-0"
              type="file"
              accept="image/jpeg, image/jpg, image/png, image/gif"
              style="z-index: -5"
              @change="profileImageChanged"
            />
            <label
              for="profile-img"
              class="
                px-2
                py-1
                rounded-lg
                mt-4
                text-sm text-white
                bg-primary
                cursor-pointer
              "
              >이미지 변경</label
            >
          </fieldset>
        </div>
        <div class="flex flex-col flex-grow">
          <dynamic-input
            class="mb-2"
            :data="nameInput"
            :disabled="true"
            @update="nameInput.onUpdate"
          />
          <div class="flex mb-2">
            <dynamic-input
              class="w-2/3 mr-2"
              :data="idInput"
              :disabled="true"
              @update="idInput.onUpdate"
            />
            <dynamic-input
              class="w-1/3"
              :data="yearInput"
              :disabled="true"
              @update="yearInput.onUpdate"
            />
          </div>
          <dynamic-input
            class="mb-2"
            :data="majorInput"
            :disabled="true"
            @update="majorInput.onUpdate"
          />
          <div class="flex mb-2">
            <dynamic-input
              class="w-1/2 mr-2"
              :data="phoneInput"
              @update="phoneInput.onUpdate"
            />
            <dynamic-input
              class="w-1/2"
              :data="emailInput"
              @update="emailInput.onUpdate"
            />
          </div>
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
      <dynamic-input
        class="mt-4"
        :data="passwordInput"
        :inputType="'password'"
        @update="passwordInput.onUpdate"
      />
      <button
        class="w-full py-4 mt-4 mb-4 rounded-xl bg-primary text-white"
        :class="changed && passworded ? '' : 'disabled'"
        @click="submit"
      >
        저장
      </button>
    </div>
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
    const { logined, updateProfile } = useAuth();
    const { generate } = useInput();

    const changed = ref(false);

    const profileImage = ref(null);

    let profileImageFiles = null;
    const profileImageChanged = (e) => {
      const file = e.target.files[0];
      profileImageFiles = e.target.files;

      const reader = new FileReader();

      reader.onload = () => {
        profileImage.value = reader.result;
        changed.value = true;
      };

      reader.readAsDataURL(file);
    };

    const nameInput = generate({
      placeholder: "이름",
    });

    const idInput = generate({
      placeholder: "학번",
    });

    const yearInput = generate({
      placeholder: "학년",
    });

    const phoneInput = generate({
      placeholder: "전화번호",
    });

    const emailInput = generate({
      placeholder: "이메일",
    });

    const majorInput = generate({
      placeholder: "학부",
    });

    const clubInput = generate({
      placeholder: "동아리",
      onChange(data) {
        changed.value = true;
      },
    });

    const infoInput = generate({
      placeholder: "간단 소개",
      onChange(data) {
        changed.value = true;
      },
    });

    const passworded = ref(false);
    const passwordInput = generate({
      placeholder: "비밀번호를 한번 더 입력해주세요",
      onChange(data) {
        passworded.value = true;
      },
    });

    const submit = async () => {
      const params = {
        phon: phoneInput.value.value,
        email: emailInput.value.value,
        info: infoInput.value.value,
        password: passwordInput.value.value,
        clud: clubInput.value.value,
      };

      if (profileImageFiles) {
        params.fileArray = profileImageFiles;
      }

      console.log(params);

      const result = await updateProfile(params);

      if (result.state) {
        alert(result.message);
        location.reload();
      } else {
        alert(result.error.message);
      }
    };

    const fillInUserInfo = () => {
      profileImage.value = logined.value.imagePath
        ? "https://jj-cse.online" + logined.value.imagePath[0]
        : "https://via.placeholder.com/500x500/FFFFFF/CED4DA?text=NO+PROFILE";
      nameInput.value.initial = logined.value.name;
      idInput.value.initial = logined.value.user_id;
      yearInput.value.initial = logined.value.year;
      phoneInput.value.initial = logined.value.phon || "";
      emailInput.value.initial = logined.value.email || "";
      majorInput.value.initial = logined.value.hakbu || "";
      clubInput.value.initial = logined.value.clud || "";
      infoInput.value.initial = logined.value.info || "";
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
      changed,
      passworded,
      profileImage,
      profileImageChanged,
      nameInput,
      idInput,
      yearInput,
      phoneInput,
      emailInput,
      majorInput,
      clubInput,
      infoInput,
      passwordInput,
      submit,
    };
  },
};
</script>

<style></style>
