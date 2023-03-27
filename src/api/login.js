import request from '../utils/request'

// 该方法用于获取登录二维码的key
const generateQrKey = async () => {
  try {
    const response = await request.get('/login/qr/key', {
      params: {
        _t: Date.now(),
      },
    })
    return response.data
  } catch (error) {
    console.error('Error generating QR key:', error)
  }
}
// 该方法用于获取登录二维码
const createQrCode = async key => {
  try {
    const response = await request.get('/login/qr/create', {
      params: {
        key: key,
        qrimg: true,
        _t: Date.now(),
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating QR code:', error)
  }
}
// 该方法用于检查二维码的状态
const checkQrStatus = async key => {
  try {
    const response = await request.get('/login/qr/check', {
      params: {
        key: key,
        _t: Date.now(),
      },
    })
    return response.data
  } catch (error) {
    console.error('Error checking QR status:', error)
  }
}

export { generateQrKey, createQrCode, checkQrStatus }
