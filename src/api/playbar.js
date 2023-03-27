import request from '../utils/request'

const getSongUrl = id => {
  return request.get(`/song/url?id=${id}&br=320000`)
}

const getSongLyric = id => {
  return request.get(`/lyric?id=${id}`)
}

export { getSongUrl, getSongLyric }
