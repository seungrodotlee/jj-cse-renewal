import { computed, resolveDirective } from "vue";
import { useStore } from "vuex";
import { routerKey, useRouter } from "vue-router";

import useAPI from "./useAPI";

export default function useAuth() {
  const router = useRouter();
  const store = useStore();
  const { get, post } = useAPI().request;

  const logined = computed(() => store.getters.getUserInfo);

  const fetchProfile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const authCheck = await post("/authCheck");

        if (!authCheck.data) {
          resolve(null);
          return;
        }

        const result = await post("/me");

        resolve(result.data);
      } catch (e) {
        console.error(e.stack);
      }
    });
  };

  const login = (params) => {
    return new Promise(async (resolve, reject) => {
      let loginedUser = await fetchProfile();

      if (loginedUser) {
        store.commit("setUserInfo", loginedUser);

        resolve({
          state: true,
          data: loginedUser,
        });
        return;
      } else {
        resolve({
          statue: false,
        });
      }

      const result = await post("/login", params);

      if (result.state) {
        loginedUser = await fetchProfile();

        store.commit("setUserInfo", loginedUser);
        resolve({
          state: true,
          data: loginedUser,
        });
      } else {
        resolve(result);
      }
    });
  };

  const logout = async (params) => {
    const result = await get("/logout");

    if (result.state) {
      store.commit("setUserInfo", null);
      router.push({ name: "Home" });
    } else {
      alert(result.error.message);
    }
  };

  const register = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await post("/register", params);

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

  const updateProfile = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await post("/auth/profile", params);

      resolve(result);
    });
  };

  return {
    logined,
    login,
    logout,
    register,
    updateProfile,
  };
}
