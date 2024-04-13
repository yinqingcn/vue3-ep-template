/* eslint-disable */
import Axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  ResponseType,
} from 'axios';
// import { useUserStore } from '@/storeuser';
import router from '@/router';
import 'element-plus/es/components/message/style/css';
import { ElMessage } from 'element-plus';

const baseURL: string = '';
const axios = Axios.create({
  baseURL, // 基础 url
  withCredentials: true,
  timeout: 60000, // 超时 60s
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use(
  (config: any) => {
    // 附加上token
    // const userStore = useUserStore();
    // const token = userStore.getToken;
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    // config.headers['token'] = token;
    config.headers['timestamp'] = new Date().getTime();
    return config;
  },
  (error: any) => Promise.reject(error),
);
const WHITE_URL_LIST = ['/test'];
axios.interceptors.response.use(
  (response) => {
    // 服务器正常返回
    const { data } = response;
    if (response?.config?.responseType) {
      if (['arraybuffer', 'blob'].includes(response.config.responseType)) {
        return response;
      }
    }
    if (data.result) {
      return response;
    } else {
      ElMessage({
        type: 'error',
        message: data.desc,
      });
      return Promise.reject({
        code: data.code,
        message: data.desc,
      });
    }
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !WHITE_URL_LIST.includes(error.config.url)
    ) {
      // const userStore = useUserStore();
      // userStore.logout();
      router.push({
        name: 'Login',
      });
      return;
    }
    if (error.response?.status === 404) {
      ElMessage({
        type: 'error',
        message: '接口地址不存在',
      });
      return;
    }
    return Promise.reject({
      code: error.response?.status,
      message: error.response?.statusText || error.message,
    });
  },
);

export default axios;

export function get<T = any, D = any>(
  url: string,
  params?: D,
  config?: AxiosRequestConfig<D>,
): Promise<HttpResponse<T>> {
  const localConfig = config ? config : ({} as AxiosRequestConfig<D>);
  if (params) {
    localConfig.params = Object.assign(
      {},
      localConfig.params ? localConfig.params : {},
      params,
    );
  }
  return axios
    .get<HttpResponse<T>>(url, localConfig)
    .then((resp: AxiosResponse<HttpResponse<T>>) => resp.data);
}

export function post<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<HttpResponse<T>> {
  return axios
    .post<HttpResponse<T>>(url, data, config)
    .then((resp: AxiosResponse<HttpResponse<T>>) => resp.data);
}

export function put<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<HttpResponse<T>> {
  return axios
    .put<HttpResponse<T>>(url, data, config)
    .then((resp: AxiosResponse<HttpResponse<T>>) => resp.data);
}

export function patch<T = any, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<HttpResponse<T>> {
  return axios
    .patch<HttpResponse<T>>(url, data, config)
    .then((resp: AxiosResponse<HttpResponse<T>>) => resp.data);
}

export function del<T = any, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
): Promise<HttpResponse<T>> {
  return axios
    .delete<HttpResponse<T>>(url, config)
    .then((resp: AxiosResponse<HttpResponse<T>>) => resp.data);
}

export function request<T = any, D = any>(
  config: AxiosRequestConfig<D>,
): Promise<HttpResponse<T>> {
  return axios
    .request<HttpResponse<T>>(config)
    .then((resp: AxiosResponse<HttpResponse<T>>) => resp.data);
}

const upload = (url: string, data: any) =>
  axios({
    url,
    data,
    method: 'post',
    timeout: 3600000, // 上传超时时间1小时
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// 下载
const download = (url: string, responseType: ResponseType = 'arraybuffer') =>
  axios({
    url,
    method: 'GET',
    responseType,
    headers: {
      'Content-Type': 'application/json',
    },
  });
// post传参形式的下载
const downloadWidthParam = (
  url: string,
  data: any,
  responseType: ResponseType = 'blob',
) =>
  axios({
    url,
    data,
    method: 'POST',
    responseType,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
export { upload, download, downloadWidthParam };
