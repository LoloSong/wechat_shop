import regeneratorRuntime from 'regenerator-runtime.js'
import Config from 'Config'
import Token from 'Token'

export default class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl
  }

  request (params, noRefetch) {
    let _this = this
    return new Promise((resolve, reject) => {
      if (!params.method) {
        params.method = 'GET'
      }
      wx.request({
        url: this.baseRequestUrl + params.url,
        method: params.method,
        data: params.data,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success (res) {
          let code = res.data.code.toString()
          if (code === '0') {
            resolve(res.data)
          } else {
            if (code === '10006' && !noRefetch) {
              _this._refetch(params)
            } else {
              resolve(res.data)
            }
          }
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }

  async _refetch(params) {
    let token = new Token()
    await token.getTokenFromServer()
    this.request(params, true)
  }

  // 获得元素上绑定的值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key]
  }
}