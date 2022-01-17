<template>
  <div class="relative container mx-auto">
    <div class="flex flex-col items-start">
      <label for="category-selector">카테고리</label>
      <select id="category-selector" class="mb-4" v-model="selectedCategory">
        <option disabled>카테고리를 선택해주세요</option>
        <option v-for="c in category" :key="c.id" :value="c.id">
          {{ c.cateNm }}
        </option>
      </select>
      <dynamic-input
        class="mb-4"
        :data="titleInput"
        @update="titleInput.onUpdate"
      />
      <quill-editor
        class="w-full"
        style="min-height: 300px"
        placeholder="내용을 입력해주세요"
        v-model:content="content"
        contentType="html"
        theme="snow"
        toolbar="full"
      />
      <fieldset class="flex relative w-full">
        <input
          id="file-input"
          class="absolute opacity-0"
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          multiple="multiple"
          style="z-index: -5"
          @change="fileChanged"
        />
        <div
          class="
            relative
            flex flex-col
            sm:flex-row
            w-full
            bg-white
            border border-gray-300
            rounded-xl
            overflow-hidden
          "
        >
          <p v-if="!files" class="flex-grow px-4 py-2">선택된 파일 없음</p>
          <div v-else class="flex-grow flex flex-col p-1">
            <div
              v-for="(f, i) in files"
              :key="i"
              class="
                flex
                justify-between
                items-center
                p-2
                rounded-lg
                border border-gray-300
                m-1
              "
            >
              <p>{{ f }}</p>
              <button
                class="text-white bg-red-600 p-2 rounded-lg"
                @click="
                  () => {
                    files.splice(i, 1);
                    fileList.splice(i, 1);
                  }
                "
              >
                <x-icon class="w-4 h-4" />
              </button>
            </div>
          </div>
          <label
            for="file-input"
            class="flex-center px-4 py-4 bg-primary text-white cursor-pointer"
            >파일 선택</label
          >
        </div>
      </fieldset>
      <button @click="submit">작성</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

import { QuillEditor } from "@vueup/vue-quill";
import { XIcon } from "@heroicons/vue/outline";

import DynamicInput from "@/components/Form/DynamicInput.vue";

import useAuth from "@/composable/api/useAuth";
import useBoard from "@/composable/api/useBoard";
import useInput from "@/composable/Form/useInput";

export default {
  components: {
    DynamicInput,
    QuillEditor,
    XIcon,
  },
  setup() {
    const router = useRouter();

    const { logined } = useAuth();
    const { fetchCategory, writeBoard } = useBoard();
    const { generate } = useInput();

    const category = ref([]);
    const selectedCategory = ref("카테고리를 선택해주세요");

    const titleInput = generate({
      placeholder: "제목을 입력해주세요",
    });

    const getCatogoryList = async () => {
      const result = await fetchCategory(true);

      //console.log(result);

      result.forEach((r) => {
        category.value.push(r);
        if (r.child.length > 0) {
          r.child.forEach((c) => {
            category.value.push(c);
          });
        }
      });

      //console.log(category.value);
    };

    onMounted(() => {
      if (logined.value) {
        getCatogoryList();
      }
    });

    watch(logined, () => {
      getCatogoryList();
    });

    //watch(selectedCategory, (to) => console.log(to));

    const content = ref("");

    const files = ref(null);
    const fileList = ref(null);
    const fileChanged = (e) => {
      const fs = Array.from(e.target.files);
      let list = fs.map((f) => f.name);

      files.value = list;
      fileList.value = fs;
    };

    const submit = async () => {
      const params = {
        board_id: selectedCategory.value,
        title: titleInput.value.value,
        content: content.value,
      };

      if (files.value) {
        params.fileArray = fileList.value;
      }

      const result = await writeBoard(params);

      //console.log(result);

      if (result.state) {
        alert("글을 성공적으로 작성하였습니다");
        router.push({ name: "Home" });
      }
    };

    return {
      category,
      selectedCategory,
      titleInput,
      content,
      files,
      fileChanged,
      submit,
    };
  },
};
</script>

<style></style>
