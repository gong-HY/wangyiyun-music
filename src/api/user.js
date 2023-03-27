import request from '../utils/request'

const getUserAccount = () => {
  return request({
    url: '/user/account',
    method: 'get',
  })
}
const getUserLevel = () => {
  return request({
    url: '/user/level',
    method: 'get',
  })
}

export { getUserAccount, getUserLevel }
