import { ref } from "vue";

import useAPI from "./useAPI";

import dummyNotices from "@/dummys/notice";

export default function useBoard() {
  const { get, post } = useAPI().request;

  const test = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await get("/board/noticeList", params);
    });
  };

  const getNews = (idx) => {
    if (idx) {
      idx = parseInt(idx);
    }

    return new Promise(async (resolve, reject) => {
      const notices = dummyNotices.fetched(
        dummyNotices.content,
        dummyNotices.user
      );

      if (idx) {
        notices.find((d) => {
          return d.content_id === idx;
        });

        resolve(item);
      } else {
        resolve(notices);
      }

      return;
    });
  };

  const category = ref(null);
  const fetchCategory = (isAdmin = false) => {
    return new Promise(async (resolve, reject) => {
      // const uri = "/common/category" + (isAdmin ? "/admin" : "");
      const uri = "/common/category";
      const response = await get(uri);

      noticeIdx.value = response.find((c) => c.cateNm === "공지사항").id;
      category.value = response;

      resolve(response);
    });
  };

  const noticeIdx = ref(null);
  const fetchNotices = (idx) => {
    return new Promise(async (resolve, reject) => {
      if (!noticeIdx.value) {
        await fetchCategory();
      }

      const params = {
        board_id: noticeIdx.value,
        offset: idx,
      };

      const response = await get("/common/board", params);

      if (!response.state) {
        return;
      }

      resolve(response.data);
    });
  };

  const fetchArticle = (idx) => {
    return new Promise(async (resolve, reject) => {
      const response = await get("/common/board/id/" + idx);

      if (response.data) resolve(response.data);
    });
  };

  const writeBoard = (params) => {
    return new Promise(async (resolve, reject) => {
      const response = await post("/common/board/write", params);

      resolve(response);
    });
  };

  const addQuestion = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await post("/common/question/add", params);

      result.message = result.state ? result.success : result.error;

      resolve(result);
    });
  };

  return {
    category,
    fetchCategory,
    fetchNotices,
    fetchArticle,
    writeBoard,
    addQuestion,
  };
}
