import axios from "axios"
import { ACCESS_TOKEN_KEY } from "../authProvider"

export function getApiEndpoint() {
  return "http://localhost:3000/api"
}

export function getAxiosInstance() {
  const axiosInstance = axios.create()

  axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  return axiosInstance
}
