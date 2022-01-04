import useAPI from "./useAPI";

export default useBoard = () => {
  const { get } = useAPI().request;

  const test = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await get("/board/noticeList", params);
    });
  };
};
