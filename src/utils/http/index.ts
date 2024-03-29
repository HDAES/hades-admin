import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { addPending, removePending } from './pending'
import { clearToken } from '@/utils/storage'
import { setRequestConfig } from './sign'

let loadingInstance
let MessageHandle

const instance: AxiosInstance = axios.create({
  timeout: 30000
})

//请求拦截
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config)
    addPending(config)

    if (config.loading) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }

    return setRequestConfig(config)
  },
  error => {
    return Promise.resolve(error)
  }
)

//响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response)
    loadingInstance?.close()

    const code = response.data.code

    if (code == 5002 || code == 5003) {
      //身份失效 退出登录
      clearToken()
      MessageHandle = ElMessage.error(response.data.message || '未知错误')
    } else {
      if (code == 200) {
        if (response.data.data) {
          if (response.data.data.list) {
            return response.data.data
          }
          return response.data.data
        } else {
          ElMessage.success(response.data.message || '操作成功')
          return response.data
        }
      } else {
        ElMessage.error(response.data.message || '未知错误')
        return Promise.reject(new Error(response.data.message))
      }
    }
  },
  error => {
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    MessageHandle?.close()
    MessageHandle = ElMessage({ type: 'error', message, duration: 5000 })

    return Promise.reject(error)
  }
)

export default instance
