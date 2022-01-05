import { computed } from "vue";
import { useStore } from "vuex";
import { routerKey, useRouter } from "vue-router";

import useAPI from "./useAPI";

export default function useAuth() {
  const router = useRouter();
  const store = useStore();
  const { get, post } = useAPI().request;

  const logined = computed(() => store.getters.getUserInfo);

  const login = (params) => {
    return new Promise(async (resolve, reject) => {
      const loginedUser = JSON.parse(localStorage.getItem("loginedUser"));

      if (loginedUser) {
        store.commit("setUserInfo", loginedUser);
        resolve({
          state: true,
          data: loginedUser,
        });
        return;
      }

      const result = await post("/login", params);

      console.log(result);

      if (result.state) {
        localStorage.setItem("loginedUser", JSON.stringify(result.data));
        store.commit("setUserInfo", result.data);
      }

      resolve(result);
    });
  };

  const logout = (params) => {
    localStorage.removeItem("loginedUser");
    store.commit("setUserInfo", null);
    router.push({ name: "Home" });
  };

  const register = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await post("/register", params);
      console.log(result);

      if (result.cnt > 0) {
        resolve(result);
        return;
      } else {
        const loginResult = await login(params);
        resolve(loginResult);
        return;
      }
    });
  };

  return {
    logined,
    login,
    logout,
    register,
  };
}
