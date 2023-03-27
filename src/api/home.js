import request from '../utils/request'

const getBanner = () => {
  return request.get('/banner?type=2')
}

const getPersonalized = () => {
  return request.get('/personalized?limit=10')
}

const getTopList = () => {
  return request.get('/toplist')
}

export { getBanner, getPersonalized, getTopList }
