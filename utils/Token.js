import Config from 'Config'
import regeneratorRuntime from 'regenerator-runtime.js'

export default class Token {
  constructor() {
    this.verifyUrl = `${Config.restUrl}/token/verify`
    this.tokenUrl = `${Config.restUrl}/token/user`
  }

  async verify() {
    let token = wx.getStorageSync('token')
    if (!token) {
      token = await this.getTokenFromServer()
    } else {
      token = this._verifyFromServer(token)
    }
    return token
  }


  // 从服务器获取令牌
  getTokenFromServer() {
    let _this = this
    return new Promise((resolve) => {
      wx.login({
        success(res) {
          wx.request({
            url: _this.tokenUrl,
            method: 'POST',
            data: {
              code: res.code
            },
            success(res) {
              wx.setStorageSync('token', res.data.data)
              resolve(res.data.data)
            }
          })
        }
      })
    })
  }

  // 校验令牌
  _verifyFromServer() {
    let _this = this
    return new Promise((resolve) => {
      wx.request({
        url: _this.verifyUrl,
        method: 'POST',
        data: {
          token: wx.getStorageSync('token')
        },
        success(res) {
          let valid = res.data.isValid
          if (!valid) {
            _this.getTokenFromServer()
          }
        }
      })
    })
  }
}