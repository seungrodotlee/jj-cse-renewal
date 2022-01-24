<template>
  <div class="relative container mx-auto py-8">
    <div class="flex flex-col items-start">
      <select
        id="category-selector"
        class="p-2 rounded-lg border border-gray-300 mb-4"
        v-model="selectedCategory"
      >
        <option disabled>카테고리를 선택해주세요</option>
        <option v-for="c in category" :key="c.id" :value="c.id">
          {{ c.cateNm }}
        </option>
      </select>
      <select
        id="category-selector"
        class="p-2 rounded-lg border border-gray-300 mb-4"
        v-model="selectedSubCategory"
      >
        <option disabled>세부 카테고리를 선택해주세요</option>
        <option v-for="sc in subCategory" :key="sc.id" :value="sc.id">
          {{ sc.cateNm }}
        </option>
      </select>
      <dynamic-input
        class="mb-4"
        :data="titleInput"
        @update="titleInput.onUpdate"
      />
      <!-- host, subText, eventFl, mainFl, peroidFl, periodSDate, periodEDate -->
      <div
        class="w-full grid grid-cols-4 gap-4 mb-4"
        v-if="selectedCategory === 2"
      >
        <dynamic-input :data="hostInput" @update="hostInput.onUpdate" />
        <dynamic-input :data="subTextInput" @update="subTextInput.onUpdate" />
        <dynamic-input :data="eventFlInput" @update="eventFlInput.onUpdate" />
        <dynamic-input :data="mainFlInput" @update="mainFlInput.onUpdate" />
        <dynamic-input :data="periodFlInput" @update="periodFlInput.onUpdate" />
        <div
          class="
            flex
            justify-center
            px-8
            flex-col
            border border-gray-300
            rounded-2xl
          "
        >
          <label for="s-date">시작일</label>
          <input id="s-date" type="date" v-model="periodSDate" />
        </div>
        <div
          class="
            flex
            justify-center
            px-8
            flex-col
            border border-gray-300
            rounded-2xl
          "
        >
          <label for="e-date">종료일</label>
          <input id="e-date" type="date" v-model="periodEDate" />
        </div>
      </div>

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
      <button
        class="flex-center w-full p-4 mt-4 rounded-lg bg-primary text-white"
        @click="submit"
      >
        작성
      </button>
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
    const subCategory = ref([]);
    const selectedSubCategory = ref("세부 카테고리를 선택해주세요");

    const titleInput = generate({
      placeholder: "제목을 입력해주세요",
    });

    const hostInput = generate({
      placeholder: "호스트를 입력해주세요",
    });

    const subTextInput = generate({
      placeholder: "서브 텍스트를 입력해주세요",
    });

    const eventFlInput = generate({
      placeholder: "'eventFl' 값을 입력해주세요",
    });

    const mainFlInput = generate({
      placeholder: "'mainFl' 값을 입력해주세요",
    });

    const periodFlInput = generate({
      placeholder: "'periodFl' 값을 입력해주세요",
    });

    const periodSDate = ref(null);
    const periodEDate = ref(null);

    let cateList;
    const getCatogoryList = async () => {
      const result = await fetchCategory(true);
      cateList = result;

      //console.log(result);

      result.forEach((r) => {
        category.value.push(r);
      });

      //console.log(category.value);
    };

    watch(selectedCategory, (to) => {
      const cate = cateList.find((c) => c.id === to);
      subCategory.value = [];
      if (cate.child.length > 0) {
        cate.child.forEach((c) => {
          subCategory.value.push(c);
        });
      }
    });

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
      let params = {
        title: titleInput.value.value,
        content: content.value,
      };

      if (files.value) {
        params.fileArray = fileList.value;
      }

      if (selectedCategory.value === 2) {
        params = {
          ...params,
          ...{
            cate_id: selectedCategory.value,
            host: hostInput.value.value,
            subText: subTextInput.value.value,
            eventFl: eventFlInput.value.value,
            mainFlInput: mainFlInput.value.value,
            periodFl: periodFlInput.value.value,
          },
        };

        if (periodFlInput.value.value === 1) {
          params = {
            ...params,
            ...{
              periodSDate: periodSDate.value,
              periodSDate: periodSDate.value,
            },
          };
        }
      } else {
        params.cate_id = selectedSubCategory.value;
      }

      console.log(params);

      const result = await writeBoard(params);
      console.log(result);

      //console.log(result);

      if (result.state) {
        alert("글을 성공적으로 작성하였습니다");
        router.push({ name: "Home" });
      }
    };

    return {
      category,
      selectedCategory,
      subCategory,
      selectedSubCategory,
      titleInput,
      hostInput,
      subTextInput,
      eventFlInput,
      mainFlInput,
      periodFlInput,
      periodSDate,
      periodEDate,
      content,
      files,
      fileChanged,
      submit,
    };
  },
};
</script>

<style></style>
