import axios from "axios";

export default function useAPI() {
  const domain = "https://jj-cse.online/api";
  const version = "v1";

  const request = {
    get(url, data = null) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(domain + url, data, {
            withCredentials: true,
          });

          resolve(response.data);
        } catch (e) {
          console.error(e.stack);
        }
      });
    },
    post(url, data = null) {
      return new Promise(async (resolve, reject) => {
        try {
          const form = new FormData();

          if (data) {
            for (let key in data) {
              if (typeof data[key] == "object") {
                for (let innerKey in data[key]) {
                  form.append(key + `[${innerKey}]`, data[key][innerKey]);
                }
              } else {
                form.append(key, data[key]);
              }
            }
          }

          const response = await axios.post(domain + url, form, {
            withCredentials: true,
            headers: {
              "Content-type": "multipart/form-data",
            },
          });

          resolve(response.data);
        } catch (e) {
          console.error(e.stack);
        }
      });
    },
  };

  return {
    request,
  };
}
