import { ref } from "vue";

import useAPI from "./useAPI";
import useAuth from "./useAuth";

export default function useEvent() {
  const { get, post } = useAPI().request;
  const { logined } = useAuth();

  const eventList = ref(null);

  const getImagePath = (data) => {
    if (!data.imagePath) return null;

    let list = JSON.parse(data.imagePath.replace("”", '"'));

    list = list.map((l) => "https://jj-cse.online" + l);
    return list;
  };

  const getEventStatus = (data) => {
    const current = new Date();
    const periodStart = new Date(data.periodSDate);
    const periodEnd = new Date(data.periodEDate);

    const diff = periodEnd.getTime() - current.getTime();

    let status = "";

    if (!data.periodSDate || current < periodStart) {
      status = "공지중";
    } else if (current > periodStart || current < periodEnd) {
      status = "진행중";
    } else {
      status = "마감";
    }

    return {
      status: status,
      timeLeft:
        status === "진행중" ? parseInt(diff / (1000 * 3600 * 24)) : null,
    };
  };

  const checkEventJoined = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await post("/common/event/modify", params);

        result = result === "" ? null : result;

        resolve(result);
      } catch (e) {
        console.error(e.stack);
      }
    });
  };

  const fetchEventList = async () => {
    const result = await get("/common/event");

    if (result.error) {
      return;
    }

    const pack = result.data;

    for (let i in pack) {
      const p = pack[i];

      const joined = await checkEventJoined({
        id: p.id,
        user_id: logined.value.id,
      });

      if (joined) {
        p.joined = joined;
      }

      const statusData = getEventStatus(p);
      p.status = statusData.status;
      p.timeLeft = statusData.timeLeft;

      p.images = getImagePath(p);
    }

    eventList.value = pack;
  };

  const joinEvent = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await post("/common/event/join", params);

        console.log(result);

        resolve(result);
      } catch (e) {
        console.error(e.stack);
      }
    });
  };

  const modifyEvent = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await post("/common/event/modify/join", params);

        console.log(result);

        resolve(result);
      } catch (e) {
        console.error(e.stack);
      }
    });
  };

  return {
    eventList,
    fetchEventList,
    joinEvent,
    modifyEvent,
    checkEventJoined,
  };
}
