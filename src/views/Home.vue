<template>
  <div class="home w-full h-full">
    <carousel
      v-if="banners"
      class="banner-carousel container mx-auto mb-4 overflow-hidden"
      :wrap-around="true"
    >
      <slide v-for="b in banners" :key="b.id" style="max-height: 600px">
        <a class="flex-center w-full h-full" :href="b.link">
          <img
            class="w-full h-full object-contain"
            :src="`https://jj-cse.online${b.filePath[0]}`"
          />
        </a>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
    <section class="container mx-auto mb-4 flex flex-col">
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
        CSE Notice
      </div>
      <div class="flex-grow w-full flex flex-col bg-primary p-1">
        <div class="flex flex-col w-full bg-white py-4 mb-1">
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
          <carousel v-if="notices" :autoplay="2500" :wrap-around="true">
            <slide
              v-for="(n, i) in notices"
              :key="i"
              class="flex flex-col items-start px-6 text-left"
            >
              <p class="text-xl font-bold">{{ n.title }}</p>
              <div class="py-2">
                <text-box :line="3" :content="n.content" />
              </div>
              <div class="w-full flex justify-between">
                <p class="text-gray-600">{{ n.created_at }}</p>
                <router-link
                  :to="{
                    name: 'Article',
                    params: { board: 'notices', idx: n.id },
                  }"
                  class="text-sm px-2 py-1 text-white bg-primary rounded-md"
                >
                  더보기
                </router-link>
              </div>
            </slide>
          </carousel>
        </div>
        <div class="flex flex-col w-full bg-white py-4">
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
            새소식
          </p>
          <carousel v-if="notices" :autoplay="2500" :wrap-around="true">
            <slide
              v-for="(n, i) in news"
              :key="i"
              class="flex flex-col items-start px-6 text-left"
            >
              <p class="text-xl font-bold">{{ n.title }}</p>
              <div class="py-2">
                <text-box :line="3" :content="n.content" />
              </div>
              <div class="w-full flex justify-between">
                <p class="text-gray-600">{{ n.created_at }}</p>
                <router-link
                  :to="{
                    name: 'Article',
                    params: { board: 'notices', idx: n.id },
                  }"
                  class="text-sm px-2 py-1 text-white bg-primary rounded-md"
                >
                  더보기
                </router-link>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
    </section>
    <section
      class="px-4 sm:px-0 slider-section container mx-auto mb-4"
      :class="
        displayedEventList && displayedEventList.length > 1
          ? 'w-full'
          : 'w-full xl:w-2/3'
      "
    >
      <carousel
        v-if="showEventCarousel"
        :items-to-show="carouselImageShow"
        :wrap-around="true"
        :snap-align="'start'"
        class="w-full text-left"
      >
        <slide
          v-for="(e, i) in displayedEventList"
          :key="i"
          :class="[i < displayedEventList.length - 1 ? 'lg:pr-4' : '']"
        >
          <div
            class="flex flex-col h-full w-full px-4 py-4 bg-gray-200 rounded-xl"
          >
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
              v-html="e.status"
            ></p>
            <p class="text-xl w-full font-bold">{{ e.title }}</p>
            <div class="my-4">
              <text-box :line="2" :content="e.content" />
            </div>
            <img
              class="flex-grow mb-4 object-cover"
              :src="
                e.images ? e.images[0] : 'https://via.placeholder.com/1000x1000'
              "
            />
            <div class="flex w-full justify-between items-center">
              <p class="text-gray-600">{{ e.periodSDate }}</p>
              <router-link
                :to="{ name: 'JoinEvent', params: { idx: e.id } }"
                class="px-3 py-2 rounded-lg"
                :class="
                  e.status === '진행중'
                    ? 'text-white bg-primary'
                    : 'invisible disabled'
                "
              >
                {{ e.joined ? "내 신청정보" : "신청하기" }}
              </router-link>
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
          <div class="flex flex-col sm:flex-row">
            <dynamic-input
              class="mb-4 w-full sm:mb-0 sm:mr-4"
              :data="titleInput"
              @update="titleInput.onUpdate"
            />
            <dynamic-input
              class="mb-4 w-full"
              :data="yearInput"
              @update="yearInput.onUpdate"
            />
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
              @click="submitQuestion"
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
import { computed, onMounted, ref, watch } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

import MainHeader from "@/components/Layout/MainHeader.vue";
import TextBox from "@/components/Elements/TextBox.vue";
import DynamicInput from "@/components/Form/DynamicInput.vue";

import useInput from "@/composable/Form/useInput";
import useEvent from "@/composable/api/useEvent";
import useAuth from "@/composable/api/useAuth";
import useBoard from "@/composable/api/useBoard";

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
    const { logined } = useAuth();
    const { generate } = useInput();
    const { eventList, fetchEventList } = useEvent();
    const {
      fetchBanners,
      fetchCategory,
      fetchNotices,
      fetchNews,
      addQuestion,
    } = useBoard();

    const banners = ref(null);

    const displayedEventList = computed(() => {
      if (!eventList.value) return;

      const list = eventList.value.filter((e) => e.mainFl === 1);

      return list;
    });
    const showEventCarousel = ref(false);
    const carouselImageShow = ref(null);

    const setCarouselCellSize = (list) => {
      const cell = list.length > 2 ? 2.5 : list.length;

      carouselImageShow.value = window.innerWidth > 1024 ? cell : 1;
      showEventCarousel.value = true;
    };

    watch(eventList, (to) => {
      setCarouselCellSize(displayedEventList.value);
    });

    const notices = ref(null);
    const news = ref(null);

    const titleInput = generate({
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

    const submitQuestion = async () => {
      const params = {
        title: titleInput.value.value,
        year: yearInput.value.value,
        content: contentInput.value.value,
      };

      const result = await addQuestion(params);

      alert(result.message);
      location.reload();
    };

    onMounted(async () => {
      banners.value = await fetchBanners();
      await fetchCategory();

      let result = await fetchNotices();
      if (result) {
        notices.value = result[0].child;
      }

      result = await fetchNews();
      if (result) {
        news.value = result[0].child;
      }

      if (eventList.value) {
        setCarouselCellSize();
      } else {
        fetchEventList();
      }
    });

    watch(logined, async () => {
      await fetchEventList();
    });

    return {
      banners,
      carouselImageShow,
      displayedEventList,
      showEventCarousel,
      notices,
      news,
      titleInput,
      yearInput,
      contentInput,
      submitQuestion,
    };
  },
};
</script>
<style lang="scss">
.main-carousel {
  @apply flex justify-center items-center overflow-hidden;
  height: 500px;
}

.banner-carousel .carousel__prev {
  left: 2rem;
  transform: translate(0, -50%);
}

.banner-carousel .carousel__next {
  right: 2rem;
  transform: translate(0, -50%);
}
</style>
