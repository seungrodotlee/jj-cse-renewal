<template>
  <div class="flex">
    <input ref="fileInput" type="file" name="" multiple="multiple" id="" />
    <button @click="submit">ㅇㅇ</button>
  </div>
</template>

<script>
import { ref } from "vue";
import useAPI from "@/composable/api/useAPI";

export default {
  setup() {
    const { post } = useAPI().request;

    const fileInput = ref(null);

    const submit = async () => {
      const params = {
        phon: "01030567421",
        email: "srlee0226w@gmail.com",
        info: "test2",
        fileArray: fileInput.value.files,
        password: "409226srl!",
      };

      const result = await post("/auth/profile", params);

      console.log(result);
    };

    return {
      fileInput,
      submit,
    };
  },
};
</script>

<style></style>
