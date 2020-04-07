import axios from "axios";
import { stringify } from "qs";
axios.defaults.timeout = 10000; //请求超时设置
axios.defaults.withCredentials = false;

axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    if (localStorage.getItem("token")) {
      config.headers["authorization"] =
        "Bearer" + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.error(error);
  }
);
// http.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem("token")) {
//       config.headers["authorization"] =
//         "Bearer" + localStorage.getItem("token");
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
var request = (options, res) => {
  return axios
    .request({
      url: options.url,
      method: options.method,
      data: stringify(options.body),
      params: options.params,
    })
    .then(
      (response) => {
        return response;
      },
      (err) => {
        throw err;
      }
    )
    .catch((error) => {
      throw error;
    });
};

export const http = {};
const methods = ["get", "post", "put", "delete"];
methods.forEach((method) => {
  http[method] = (url, params = {}) => {
    if (method === "get") {
      return request({ url, params, method });
    }
    return request({ url, body: params, method });
  };
});

export default function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  plugin.installed = true;
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        const obj = {
          get: http["get"],
          post: http["post"],
          put: http["put"],
          delete: http["delete"],
        };
        return obj;
      },
    },
  });
}
