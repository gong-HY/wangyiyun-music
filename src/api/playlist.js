import request from '../utils/request'

const getPlaylistDetail = id => {
  return request.get(`/playlist/detail?id=${id}`)
}

const getSongs = id => {
  return request.get(`/playlist/track/all?id=${id}&limit=10&offset=0`)
}

export { getPlaylistDetail, getSongs }
