import request from '../utils/request'

const search = keywords => {
  return request.get(`/cloudsearch?keywords=${keywords}`)
}

export { search }
