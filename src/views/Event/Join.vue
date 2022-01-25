<template>
  <div class="w-full h-full flex-center flex-col" v-if="!logined">
    <div class="flex flex-col">
      <p class="mb-4">이벤트 신청을 위해서는 로그인이 필요합니다.</p>
      <router-link
        class="flex-center py-2 rounded-lg bg-primary text-white mb-4"
        :to="{ name: 'Home' }"
        >메인으로</router-link
      >
      <router-link
        class="flex-center py-2 rounded-lg bg-primary text-white"
        :to="{ name: 'Login' }"
        >로그인</router-link
      >
    </div>
  </div>
  <div v-if="eventData" class="container mx-auto flex flex-col">
    <div class="flex items-center mt-4 border-b border-gray-300">
      <p class="text-3xl font-black py-4 pb-5 px-4 sm:px-0">
        {{ eventData.title }} 이벤트 참여
      </p>
      <p
        class="text-xl font-bold ml-4 px-2 py-1 rounded-lg"
        :class="`bg-${eventData.color}-200 text-${eventData.color}-600`"
      >
        {{ eventData.status }}
      </p>
      <p
        v-if="eventData.timeLeft"
        class="
          text-xl
          font-bold
          ml-4
          px-2
          py-1
          rounded-lg
          bg-gray-200
          text-gray-600
        "
      >
        D-{{ eventData ? eventData.timeLeft : "" }}
      </p>
    </div>
    <div class="border-b border-gray-300 py-4">
      <div class="w-4/5 mx-auto">
        <carousel v-if="eventData.images">
          <slide v-for="(img, i) in eventData.images" :key="i">
            <div class="w-full h-full">
              <img class="w-full h-full object-cover" :src="img" />
            </div>
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
        <p class="text-lg font-bold" v-html="eventData.subText"></p>
        <p v-html="eventData.content"></p>
      </div>
    </div>
    <p
      class="
        text-xl
        font-extrabold
        py-4
        px-4
        sm:px-0
        border-b border-gray-300
        mb-4
      "
    >
      기본정보
    </p>
    <div
      class="
        flex flex-col
        md:grid md:grid-cols-4 md:gap-4
        pb-4
        px-4
        sm:px-0
        border-b border-gray-300
      "
    >
      <dynamic-input
        class="col-start-1 col-end-3 mb-4 md:mb-0"
        :data="nameInput"
        :disabled="true"
        @update="nameInput.onUpdate"
      />
      <dynamic-input
        class="col-start-3 col-end-4 mb-4 md:mb-0"
        :data="idInput"
        :disabled="true"
        @update="idInput.onUpdate"
      />
      <dynamic-input
        class="col-start-4 col-end-5 mb-4 md:mb-0"
        :data="yearInput"
        :disabled="true"
        @update="yearInput.onUpdate"
      />
      <dynamic-input
        class="col-start-1 col-end-3 mb-4 md:mb-0"
        :data="emailInput"
        @update="emailInput.onUpdate"
      />
      <dynamic-input
        class="col-start-3 col-end-5 mb-4 md:mb-0"
        :data="phoneInput"
        @update="phoneInput.onUpdate"
      />
      <dynamic-input
        class="col-start-1 col-end-5"
        :data="etcInput"
        @update="etcInput.onUpdate"
      />
    </div>
    <p
      class="
        text-xl
        font-extrabold
        py-4
        px-4
        sm:px-0
        border-b border-gray-300
        mb-4
      "
    >
      이벤트 참여 폼
    </p>
    <div class="flex-grow mb-8 px-4 sm:px-0">
      <div class="border border-gray-300 rounded-xl overflow-hidden mb-4">
        <quill-editor
          style="min-height: 300px"
          placeholder="내용을 입력해주세요"
          v-model:content="content"
          contentType="html"
          theme="snow"
          toolbar="full"
        />
      </div>

      <fieldset class="flex relative w-full">
        <input
          id="event-file"
          class="absolute opacity-0"
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          multiple="multiple"
          style="z-index: -5"
          @change="eventFileChanged"
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
          <p
            v-if="!eventFile && !eventData.existFiles"
            class="flex-grow px-4 py-2"
          >
            선택된 파일 없음
          </p>
          <div v-else class="flex-grow flex flex-col p-1">
            <div
              v-for="(ef, i) in eventData.existFiles"
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
              <p>등록된 파일 {{ i }}</p>
              <div class="flex">
                <a
                  :href="`https://jj-cse.online${ef}`"
                  class="
                    flex-center
                    bg-primary
                    text-sm text-white
                    font-light
                    px-2
                    rounded-lg
                    mr-2
                  "
                  target="_blank"
                  >보기</a
                >
                <button
                  class="text-white bg-red-600 p-2 rounded-lg"
                  @click="eventData.existFiles.splice(i, 1)"
                >
                  <x-icon class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              v-for="(e, i) in eventFile"
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
              <p>{{ e }}</p>
              <button
                class="text-white bg-red-600 p-2 rounded-lg"
                @click="
                  () => {
                    eventFile.splice(i, 1);
                    eventFileList.splice(i, 1);
                  }
                "
              >
                <x-icon class="w-4 h-4" />
              </button>
            </div>
          </div>
          <label
            for="event-file"
            class="flex-center px-4 py-4 bg-primary text-white cursor-pointer"
            >파일 선택</label
          >
        </div>
      </fieldset>
      <p class="text-xl font-extrabold py-4 border-b border-gray-300 mb-4">
        개인정보 및 개인 고유 식별정보, 민감정보 수집 동의
      </p>
      <div
        class="w-full overflow-y-scroll pr-8 text-justify"
        style="height: 500px"
      >
        <p>
          개인정보 및 개인 고유 식별정보, 민감정보 수집 동의<br /><br />

          <span class="font-bold">개인정보 및 개인 고유 식별정보 동의</span
          ><br />
          개인정보보호법에 따라 본 홈페이지(전주대학교 컴퓨터공학과)에서 위
          이벤트를 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및
          이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시
          불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기
          바랍니다. <br />
          1. 수집하는 개인정보 이용자는 본 이벤트에 신청하지 않아도 학과
          홈페이지 이용, 정보 검색, 이벤트 확인 등 학과 홈페이지에 대한 대부분의
          서비스를 동일하게 이용할 수 있습니다.<br />
          2. 이용자가 해당 홈페이지에서 이벤트를 신청할 경우 학과 홈페이지는
          이벤트 서비스 이용을 위해 필요한 최소한의 개인정보를 수집하니다.
          [개인정보 보호법 제16조 제1항]<br />
          이벤트 신청 시점에 학과 홈페이지가 이용자로부터 수집하는 개인정보는
          아래와 같습니다 <br />
          - 회원가입 연동(inSTAR)시 '이름, 학번, 학년, 이메일, 휴대전화 번호'를
          필수 항목으로 수집합니다. <br />
          - 추가로 개인정보를 수집할 경우에는 이용자에게 '개인정보 항목,
          개인정보의 수집 및 이용목적, 개인정보의 보관기간' 에 대해 안내 드리고
          동의를 받습니다.<br />
          - 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용기록, 기기정보가
          생성되어 수집될 수 있습니다.<br />
          - 구체적으로 서비스 이용 과정에서 이용자에 관한 정보를 자동화된
          방법으로 생성하여 이를 저장(수집)하거나, 이용자의 고유한 정보를 원래의
          값으로 확인하지 못하도록 안전하게 변환하여 수집합니다.<br />
          3. 수집하는 개인정보의 이용은 오로지 이벤트 신청 및 운영에만 활용되며
          이 외의 서비스에는 이용하지 않습니다.<br />
          4. 이벤트 신청에 한해 세부 내용들을 선택적으로 수집합니다.<br />
          - 응모작이 수상작으로 선정될 경우 추후 &gt;컴퓨터공학과 우수
          사례집&lt; 수록 등 학과 발전 연구 및 홍보 자료로 활용될 수 있으며,
          추가 인터뷰 등을 요청할 수 있습니다.<br />
          - 우수 사례 선정의 경우 추가 동의 및 별도로 보유 기간을 고지합니다.<br />
          5. 위와 같은 이벤트 참여를 위한 개인정보 및 개인 고유 식별정보(학번,
          학년 등)는 이벤트 참여 후 1년간 유지됩니다.<br />
          - 그 외 학과 홈페이지 가입 시 수집된 개인정보는 홈페이지 운영 시까지
          유지됩니다.<br />
          개인정보 수집 및 이용 내역 - 학생의 성명, 학년, 전화번호 , 수집 목적 -
          학과 홈페이지 이용자 구분 및 운영, 보유기간 - 홈페이지 운영
          종료까지(종료 후 파기)<br />
          6. 위 개인정보는 제3자에게 제공되지 않으며 학과 관계자만
          이용됩니다.<br /><br />

          <span class="font-bold">민감정보 수집 동의</span><br />
          개인정보보호법 제23조, 제24조에 따라 이벤트 신청 선택적으로 작성되는
          내용에 대한 민감정보가 있을 수 있으며 이벤트 신청 및 운영에 원할한
          진행을 위해 민감정보를 수집할 수 있으며 이에 대하여 안내 드리오니
          자세히 읽은 후 동의하여 주시기 바랍니다.<br />
          1. 민감정보 수집 및 이용, 처리에 관한 내용<br />
          민감정보 수집 및 이용 내역<br />
          - 이벤트를 위한 개인 활동 내역, 수집 및 이용 목적<br />
          - 이벤트 신청 및 운영, 보유기간<br />
          - 이벤트 종료 후 365일까지(1년)<br />
          민감정보 처리는 개인정보 동의와 동일하게 적용되며 이벤트 신청 후
          1년까지 유효하며 그 이후는 파기됩니다.<br />
          - 단, 우수 사례로 선정될 경우 별도의 동의 후 보존될 수 있습니다.<br /><br />

          * 개인정보 수집에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를
          거부할 경우 이벤트 신청이 불가하며 선정 및 상금(또는 상품) 지급에
          제한을 받을 수 있습니다.<br /><br />

          본인(신청자)는 해당 이벤트 참여요령을 준수하며 개인정보/민감정보 수집
          및 이용에 동의하고 위와 같이 제출합니다.<br />
        </p>
      </div>

      <check-box
        label="개인정보 수집 동의"
        v-model:checked="privacyChecked"
        class="my-4"
      />
      <button
        class="w-full py-4 bg-primary text-white rounded-xl"
        :class="privacyChecked && changed ? '' : 'disabled'"
        @click="submit"
      >
        {{ eventData.joined ? "수정하기" : "신청하기" }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { QuillEditor } from "@vueup/vue-quill";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { XIcon } from "@heroicons/vue/outline";

import DynamicInput from "@/components/Form/DynamicInput.vue";
import CheckBox from "@/components/Form/CheckBox.vue";

import useInput from "@/composable/Form/useInput";
import useAuth from "@/composable/api/useAuth";
import useEvent from "@/composable/api/useEvent";

import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    DynamicInput,
    CheckBox,
    QuillEditor,
    Carousel,
    Slide,
    Pagination,
    Navigation,
    XIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { eventList, fetchEventList, joinEvent, modifyEvent } = useEvent();
    const { logined } = useAuth();
    const { generate } = useInput();

    const eventData = computed(() => {
      console.log(eventList.value);
      if (!eventList.value) return null;

      const result = eventList.value.find(
        (e) => e.id === parseInt(route.params.idx)
      );

      const existFiles = checkJoinedData(result);

      if (existFiles) {
        if (typeof existFiles === "string") {
          result.existFiles = [existFiles];
        } else {
          result.existFiles = existFiles;
        }
      }

      console.log(result);

      return result;
    });

    const changed = ref(false);
    const nameInput = generate({
      placeholder: "이름",
      errorCondition(data) {
        if (!data || data.length < 2) return "이름을 두글자 이상 입력해주세요!";
      },
      onChange(data) {
        changed.value = true;
      },
    });

    const idInput = generate({
      placeholder: "학번",
      fixCondition(data) {
        if (isNaN(data)) {
          return data.slice(0, data.length - 1);
        }
      },
      errorCondition(data) {
        if (data.length !== 9) return "학번은 9자리로 입력해주세요!";
      },
      onChange(data) {
        changed.value = true;
      },
    });

    const yearInput = generate({
      placeholder: "학년",
      fixCondition: (data) => {
        if (isNaN(data)) {
          return data.slice(0, data.length - 1);
        }
      },
      errorCondition(data) {
        if (data < 1 || data > 4)
          return "학년은 1~4 사이의 값으로 입력해주세요!";
      },
      onChange(data) {
        changed.value = true;
      },
    });

    const emailInput = generate({
      placeholder: "이메일",
      errorCondition(data) {
        const emailReg =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!emailReg.test(data)) return "이메일 형식이 올바르지 않습니다.";
      },
      onChange(data) {
        changed.value = true;
      },
    });

    const phoneInput = generate({
      placeholder: "휴대폰 번호 (- 제외)",
      errorCondition(data) {
        if (data.length < 10 || data.length > 11)
          return "올바른 전화번호를 입력해주세요";
      },
      onChange(data) {
        changed.value = true;
      },
    });

    const etcInput = generate({
      placeholder: "기타/참고사항",
      onChange(data) {
        changed.value = true;
      },
    });

    const content = ref("");

    const eventFileEl = ref(null);

    let eventFileList = null;
    const eventFile = ref(null);

    const eventFileChanged = (e) => {
      changed.value = true;
      const files = Array.from(e.target.files);
      let fileList = files.map((f) => f.name);

      eventFileList = eventFileList || [];
      eventFile.value = eventFile.value || [];
      eventFile.value = [...eventFile.value, ...fileList];
      eventFileList = [...eventFileList, ...e.target.files];
    };

    const privacyChecked = ref(false);

    const submit = async () => {
      const params = {
        event_id: eventData.value.id,
        user_id: logined.value.id,
        name: nameInput.value.value,
        year: yearInput.value.value,
        email: emailInput.value.value,
        phone: phoneInput.value.value,
        etc: etcInput.value.value,
        content: content.value,
      };

      if (eventFileList) {
        params.fileArray = eventFileList;
      }

      let result;
      if (eventData.value.joined) {
        params.id = eventData.value.joined.id;
        if (eventData.value.existFiles) {
          params.beforeArray = eventData.value.existFiles;
        }

        result = await modifyEvent(params);
      } else {
        result = await joinEvent(params);
      }

      if (result.state) {
        alert(`${eventData.value.joined ? "수정" : "신청"}을 완료하였습니다!`);
      } else {
        alert(result.error);
      }

      router.push({ name: "EventList" });
    };

    const checkJoinedData = (data) => {
      const joined = data.joined;

      nameInput.value.value = logined.value.name || "";
      idInput.value.value = logined.value.user_id || "";
      yearInput.value.value = logined.value.year || "";
      emailInput.value.value = logined.value.email || "";
      phoneInput.value.value = logined.value.phon || "";

      console.log("joined", joined);
      if (joined) {
        const { name, year, email, phone, etc, filePath } = joined;

        nameInput.value.value = name;
        idInput.value.value = parseInt(logined.value.user_id);
        yearInput.value.value = parseInt(year);
        emailInput.value.value = email;
        phoneInput.value.value = phone;
        etcInput.value.value = etc;
        changedByLoadedData = true;
        content.value = joined.content;

        console.log(filePath);

        if (!filePath) return;
        return JSON.parse(filePath.replace("”", '"'));
      }
    };

    onMounted(async () => {
      if (!eventList.value && logined.value) {
        fetchEventList();
      }
    });

    watch(logined, () => {
      if (!eventList.value) {
        fetchEventList();
      }
    });

    let changedByLoadedData = false;
    watch(content, (to) => {
      if (changedByLoadedData) {
        changedByLoadedData = false;
        return;
      }

      changed.value = true;
    });

    return {
      logined,
      changed,
      eventData,
      nameInput,
      idInput,
      yearInput,
      emailInput,
      phoneInput,
      etcInput,
      content,
      eventFileEl,
      eventFile,
      eventFileList,
      eventFileChanged,
      privacyChecked,
      submit,
    };
  },
};
</script>

<style lang="scss"></style>
