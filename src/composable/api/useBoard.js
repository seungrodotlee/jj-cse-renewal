import useAPI from "./useAPI";

import dummyNotices from "@/dummys/notice";

export default function useBoard() {
  const { get } = useAPI().request;

  const test = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await get("/board/noticeList", params);
    });
  };

  const getNotice = (idx) => {
    idx = parseInt(idx);
    return new Promise(async (resolve, reject) => {
      const item = dummyNotices
        .fetched(dummyNotices.content, dummyNotices.user)
        .find((d) => {
          return d.content_id === idx;
        });
      resolve(item);
      return;
    });
  };

  return {
    getNotice,
  };
}
