import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface RequestConfig extends AxiosRequestConfig {
  unauthenticated?: boolean;
}

// created an instance of axios with some defaults
const http = axios.create({
  baseURL: ((): string | undefined => {
    return `https://test.${process.env.NEXT_PUBLIC_BASE_URL}`;
  })(),
  timeout: 1000 * 45,
  headers: { "content-type": "application/json" },
});

// Add a request interceptor
http.interceptors.request.use(
  function (config: RequestConfig) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
