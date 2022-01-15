<template>
  <input ref="fileInput" type="file" multiple="multiple" />
  <button @click="submit">dd</button>
</template>

<script>
import { ref } from "vue";

import useAPI from "@/composable/api/useAPI";

export default {
  setup() {
    const fileInput = ref(null);
    const { get, post } = useAPI().request;

    const submit = async () => {
      const params = {
        phon: "01030567421",
        email: "srlee0226w@gmail.com",
        info: "test",
        fileArray: fileInput.value.files,
        password: "409226srl!",
      };

      console.log("params", params);

      const result = await post("/auth/profile", params);

      console.log("result", result);
    };

    return {
      fileInput,
      submit,
    };
  },
};
</script>

<style></style>
