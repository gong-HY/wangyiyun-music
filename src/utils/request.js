import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000', // 设置基本请求路径
  timeout: 4000, // 设置请求超时时间
  headers: {
    // 设置请求头部
    'Content-Type': 'application/json',
  },
})
export default request
