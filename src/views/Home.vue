<template>
  <div class="home w-full h-full">
    <section class="main-carousel mb-4">
      <img class="w-full object-cover" :src="currentCarousel" />
    </section>
    <section class="container mx-auto mb-4 flex flex-col lg:flex-row">
      <div
        class="
          flex
          items-center
          bg-primary
          text-white
          font-bold
          text-2xl
          px-8
          py-4
          whitespace-nowrap
          flex-shrink-0
        "
      >
        CS Notice
      </div>
      <div class="flex-grow w-full flex bg-primary p-1">
        <div class="flex flex-col w-1/2 bg-white py-4 mr-1">
          <p
            class="
              self-start
              ml-6
              mb-4
              px-4
              py-2
              rounded-lg
              bg-gray-500
              text-white
            "
          >
            공지사항
          </p>
          <carousel :autoplay="2500" :wrap-around="true">
            <slide
              v-for="(n, i) in notices"
              :key="i"
              class="flex flex-col items-start px-6 text-left"
            >
              <p class="text-xl font-bold">{{ n.title }}</p>
              <div class="py-2">
                <text-box :line="3" :content="n.content" />
              </div>
              <p class="text-gray-600">{{ n.datetime }}</p>
            </slide>
          </carousel>
        </div>
        <div class="flex w-1/2 bg-white py-4">
          <p
            class="
              self-start
              ml-6
              mb-4
              px-4
              py-2
              rounded-2xl
              bg-gray-500
              text-white
            "
          >
            새 소식
          </p>
        </div>
      </div>
    </section>
    <section class="px-4 sm:px-0 slider-section container mx-auto mb-4">
      <carousel
        :items-to-show="carouselImageShow"
        :wrap-around="true"
        :snap-align="'start'"
        class="w-full text-left"
      >
        <slide v-for="(e, i) in events" :key="i" class="lg:pr-4">
          <div class="flex flex-col px-4 py-4 bg-gray-200 rounded-xl">
            <p
              class="
                self-start
                mb-4
                px-4
                py-2
                rounded-lg
                bg-gray-500
                text-white
              "
            >
              진행중
            </p>
            <p class="text-xl w-full font-bold">{{ e.title }}</p>
            <div class="my-4">
              <text-box :line="2" :content="e.content" />
            </div>
            <img class="mb-4" :src="e.thumbnail" />
            <div class="flex w-full justify-between items-center">
              <p class="text-gray-600">{{ e.datetime }}</p>
              <button class="text-white bg-primary px-3 py-2 rounded-lg">
                신청하기
              </button>
            </div>
          </div>
        </slide>
        <template #addons>
          <navigation />
        </template>
      </carousel>
    </section>
    <section class="px-4 sm:px-0 w-full bg-gray-200 mb-4">
      <div class="container mx-auto py-8">
        <p class="text-4xl font-bold mb-8">익명 건의사항</p>
        <div class="flex flex-col">
          <div class="flex w-full mb-4">
            <dynamic-input
              class="flex-grow mr-4"
              :data="nameInput"
              @update="nameInput.onUpdate"
            />
            <dynamic-input :data="yearInput" @update="yearInput.onUpdate" />
          </div>
          <div class="flex flex-col bg-white rounded-xl">
            <dynamic-input
              :data="contentInput"
              :borderless="true"
              :isTextArea="true"
              @update="contentInput.onUpdate"
            />
            <button
              class="
                self-end
                mr-4
                mb-4
                px-4
                py-2
                bg-primary
                text-white
                rounded-lg
              "
            >
              건의하기
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

import MainHeader from "@/components/Layout/MainHeader.vue";
import TextBox from "@/components/Elements/TextBox.vue";
import DynamicInput from "@/components/Form/DynamicInput.vue";

import useInput from "@/composable/Form/useInput";

export default {
  name: "Home",
  components: {
    MainHeader,
    Carousel,
    Slide,
    Navigation,
    Pagination,
    TextBox,
    DynamicInput,
  },
  setup() {
    const { generate } = useInput();

    const carouselImageShow = ref(window.innerWidth > 1024 ? 2.5 : 1);

    const carouselCurrentIdx = ref(0);
    const carouselImages = ref([
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ]);

    const currentCarousel = computed(() => {
      return carouselImages.value[carouselCurrentIdx.value].src;
    });

    const notices = ref([
      {
        title: "공지사항 1",
        content: `
          국회의원이 회기전에 체포 또는 구금된 때에는
          현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다.
          국군의 조직과 편성은 법률로 정한다.
          모든 국민은 근로의 의무를 진다.
          국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다.
        `,
        datetime: "2021-10-10",
      },
      {
        title: "공지사항 2",
        content: `
          대통령의 임기는 5년으로 하며, 중임할 수 없다.
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은
          법률이 정하는 바에 의하여 보장된다.
          대법원장은 국회의 동의를 얻어 대통령이 임명한다.
          모든 국민은 그 보호하는 자녀에게 적어도
          초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.
          언론·출판에 대한 허가나 검열과
          집회·결사에 대한 허가는 인정되지 아니한다.
        `,
        datetime: "2022-01-01",
      },
      {
        title: "공지사항 3",
        content: `
          내용 3
        `,
        datetime: "2022-01-02",
      },
      {
        title: "공지사항 4",
        content: `
          내용 4
        `,
        datetime: "2022-01-03",
      },
    ]);

    const events = ref([
      {
        idx: "01",
        title: "이벤트 1",
        content: `
          대통령의 임기는 5년으로 하며, 중임할 수 없다.
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은
          법률이 정하는 바에 의하여 보장된다.
          대법원장은 국회의 동의를 얻어 대통령이 임명한다.
          모든 국민은 그 보호하는 자녀에게 적어도
          초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.
          언론·출판에 대한 허가나 검열과
          집회·결사에 대한 허가는 인정되지 아니한다.
        `,
        thumbnail: "https://via.placeholder.com/1000x1000",
        datetime: "2021-01-01",
      },
      {
        idx: "02",
        title: "이벤트 2",
        content: `
          대통령의 임기는 5년으로 하며, 중임할 수 없다.
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은
          법률이 정하는 바에 의하여 보장된다.
          대법원장은 국회의 동의를 얻어 대통령이 임명한다.
          모든 국민은 그 보호하는 자녀에게 적어도
          초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.
          언론·출판에 대한 허가나 검열과
          집회·결사에 대한 허가는 인정되지 아니한다.
        `,
        thumbnail: "https://via.placeholder.com/1000x1000",
        datetime: "2021-01-01",
      },
      {
        idx: "03",
        title: "이벤트 3",
        content: `
          대통령의 임기는 5년으로 하며, 중임할 수 없다.
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은
          법률이 정하는 바에 의하여 보장된다.
          대법원장은 국회의 동의를 얻어 대통령이 임명한다.
          모든 국민은 그 보호하는 자녀에게 적어도
          초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.
          언론·출판에 대한 허가나 검열과
          집회·결사에 대한 허가는 인정되지 아니한다.
        `,
        thumbnail: "https://via.placeholder.com/1000x1000",
        datetime: "2021-01-01",
      },
      {
        idx: "03",
        title: "이벤트 4",
        content: `
          대통령의 임기는 5년으로 하며, 중임할 수 없다.
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은
          법률이 정하는 바에 의하여 보장된다.
          대법원장은 국회의 동의를 얻어 대통령이 임명한다.
          모든 국민은 그 보호하는 자녀에게 적어도
          초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.
          언론·출판에 대한 허가나 검열과
          집회·결사에 대한 허가는 인정되지 아니한다.
        `,
        thumbnail: "https://via.placeholder.com/1000x1000",
        datetime: "2021-01-01",
      },
      {
        idx: "03",
        title: "이벤트 5",
        content: `
          대통령의 임기는 5년으로 하며, 중임할 수 없다.
          교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은
          법률이 정하는 바에 의하여 보장된다.
          대법원장은 국회의 동의를 얻어 대통령이 임명한다.
          모든 국민은 그 보호하는 자녀에게 적어도
          초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.
          언론·출판에 대한 허가나 검열과
          집회·결사에 대한 허가는 인정되지 아니한다.
        `,
        thumbnail: "https://via.placeholder.com/1000x1000",
        datetime: "2021-01-01",
      },
    ]);

    onMounted(() => {
      setInterval(() => {
        if (carouselCurrentIdx.value + 1 >= carouselImages.value.length) {
          carouselCurrentIdx.value = 0;
          return;
        }

        carouselCurrentIdx.value++;
      }, 2500);
    });

    const nameInput = generate({
      placeholder: "제목",
      errorCondition: (data) => {
        if (data.length === 0) {
          return "제목을 입력해주세요!";
        }
      },
    });

    const yearInput = generate({
      placeholder: "학년",
      fixCondition: (data) => {
        if (isNaN(data)) {
          return "";
        }
      },
      errorCondition: (data) => {
        if (data < 1 || data > 4)
          return "학년은 1~4 사이의 값으로 입력해주세요!";
      },
    });

    const contentInput = generate({
      placeholder: "내용",
      errorCondition: (data) => {
        if (data.length === 0) {
          return "내용을 입력해주세요!";
        }
      },
    });

    return {
      carouselImageShow,
      carouselImages,
      currentCarousel,
      notices,
      events,
      nameInput,
      yearInput,
      contentInput,
    };
  },
};
</script>
<style lang="scss" scoped>
.main-carousel {
  @apply flex justify-center items-center overflow-hidden;
  height: 500px;
}
</style>
