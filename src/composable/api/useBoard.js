import { ref } from "vue";

import useAPI from "./useAPI";
import useAuth from "./useAuth";

import dummyNotices from "@/dummys/notice";

export default function useBoard() {
  const { get, post } = useAPI().request;
  const { logined } = useAuth();

  const category = ref(null);
  const fetchCategory = (isAdmin = false) => {
    return new Promise(async (resolve, reject) => {
      const uri = "/common/category" + (isAdmin ? "/admin" : "");

      let response = await get(uri);

      if (response.error) {
        alert("카테고리 조회 실패: " + response.error.message);
        alert("일반 카테고리 목록을 불러옵니다");
        response = await get("/common/category");
      }

      if (!isAdmin) {
        const children = response.one.find(
          (c) => c.cateNm === "공지사항"
        ).child;
        noticeIdx.value = children.find((cd) => cd.cateNm === "학생회 공지").id;
        newsIdx.value = children.find((cd) => cd.cateNm === "학과공지").id;
        category.value = response;
      }

      resolve(response.one);
    });
  };

  const noticeIdx = ref(null);
  const fetchNotices = (idx) => {
    return new Promise(async (resolve, reject) => {
      if (!noticeIdx.value) {
        await fetchCategory();
      }

      const params = {
        cate_id: noticeIdx.value,
      };

      if (idx) {
        params.offset = idx;
      }

      const response = await get("/common/board/cate", params);

      if (!response.state) {
        resolve(null);
        return;
      }

      resolve(response.data);
    });
  };

  const newsIdx = ref(null);
  const fetchNews = (idx) => {
    return new Promise(async (resolve, reject) => {
      if (!newsIdx.value) {
        await fetchCategory();
      }

      const params = {
        cate_id: newsIdx.value,
      };

      if (idx) {
        params.offset = idx;
      }

      const response = await get("/common/board/cate", params);

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
      const response = await post("/imsi/admin/writer", params);

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

  const fetchBanners = () => {
    return new Promise(async (resolve, reject) => {
      const result = await get("/common/banner");

      if (result.state) {
        result.data.forEach((d) => {
          d.filePath = JSON.parse(d.filePath.replace("”", '"'));
        });

        resolve(result.data);
      }
    });
  };

  return {
    category,
    fetchCategory,
    fetchNotices,
    fetchNews,
    fetchArticle,
    fetchBanners,
    writeBoard,
    addQuestion,
  };
}
