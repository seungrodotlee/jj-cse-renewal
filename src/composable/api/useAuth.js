import useAPI from "./useAPI";

export default function useAuth() {
  const { request } = useAPI();
  const { get, post } = request;

  const login = (params) => {
    return new Promise(async (resolve, reject) => {
      const savedAccessToken = localStorage.getItem("access_token");
      const savedTokenExpiresDate = localStorage.getItem(
        "access_token_expires"
      );

      // if (savedAccessToken) {
      //   if (true) {
      //     localStorage.setItem("access_token", result.access_token);
      //     localStorage.setItem("access_token_expires", result.expires_in);

      //     resolve(result);
      //   } else {
      //   }

      //   return;
      // }

      const result = await post("/login", params);

      console.log(result);

      if (result.success) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("access_token_expires", result.expires_in);
      }

      resolve(result);
    });
  };

  const register = (params) => {
    return new Promise(async (resolve, reject) => {
      const result = await post("/register", params);

      if (result.loginCnt > 0) {
        reject({
          count: result.loginCnt,
        });
      } else {
        const loginResult = await login(params);
        resolve(loginResult);
      }
    });
  };

  return {
    login,
    register,
  };
}
