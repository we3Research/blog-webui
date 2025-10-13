import axios from "axios";

/**
 * axios 配置
 * 这里只是对axios进行配置，具体请自行修改
 *
 */

// 后续补充正式接口地址
const baseURL = "https://test.test";

export const http = axios.create({
  baseURL,
  timeout: 30000, // Set timeout to 30 seconds
});

http.interceptors.request.use(
  (config) => {
    const { headers } = config;
    // 只有在 headers 中没有设置 Content-Type 时才设置默认值
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // 自定义返回
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
